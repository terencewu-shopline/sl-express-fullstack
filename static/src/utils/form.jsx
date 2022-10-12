import React, { useState } from "react";
import { isEqual, omit, differenceBy, intersectionBy, intersectionWith, differenceWith } from "lodash"

import "antd/dist/antd.css";

import {
  Form as AForm,
  Input as AInput,
  InputNumber as AInputNumber,
  Button as AButton,
  Checkbox as ACheckbox,
  Table as ATable,
  Typography as ATypography,
  Select as ASelect,
  Space as ASpace,
} from "antd";
import {
  CheckCircleTwoTone,
  DeleteTwoTone,
  EditTwoTone
} from "@ant-design/icons";

export const Field = ({ name, label, validations, type = "default", options = [], ...rest }) => {
  const rules =
    validations === "required"
      ? [{ required: true, message: `${label} is required.` }]
      : [];

  const inputs = {
    password: () => (
      <AForm.Item label={label} name={name} rules={rules} >
        <AInput.Password {...rest} />
      </AForm.Item>
    ),
    boolean: () => (
      <AForm.Item name={name} valuePropName="checked">
        <ACheckbox  {...rest}>{label}</ACheckbox>
      </AForm.Item>
    ),
    number: () => (
      <AForm.Item label={label} name={name} rules={rules}>
        <AInputNumber {...rest} />
      </AForm.Item>
    ),
    select: () => (
      <AForm.Item label={label} name={name} rules={rules}>
        <ASelect {...rest}>
          {
            options.map(option => {
              return (
                <ASelect.Option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</ASelect.Option>
              )
            })
          }
        </ASelect>
      </AForm.Item>
    ),
    textarea: () => (
      <AForm.Item label={label} name={name} rules={rules}>
        <AInput.TextArea {...rest} />
      </AForm.Item>
    ),
    default: () => (
      <AForm.Item label={label} name={name} rules={rules}>
        <AInput {...rest} />
      </AForm.Item>
    )
  };

  return inputs[type]();
};

export const InlineField = ({
  name,
  label,
  validations,
  type = "default",
  options = [],
  ...rest
}) => {
  const rules =
    validations === "required"
      ? [{ required: true, message: `${label} is required.` }]
      : [];

  const style = {
    margin: 0
  };

  const inputs = {
    password: () => (
      <AForm.Item name={name} rules={rules} style={style}>
        <AInput.Password />
      </AForm.Item>
    ),
    boolean: () => (
      <AForm.Item name={name} valuePropName="checked" style={style}>
        <ACheckbox></ACheckbox>
      </AForm.Item>
    ),
    number: () => (
      <AForm.Item name={name} rules={rules} style={style}>
        <AInputNumber />
      </AForm.Item>
    ),
    select: () => (
      <AForm.Item name={name} rules={rules} style={style}>
        <ASelect>
          {
            options.map(option => {
              return (
                <ASelect.Option key={option.value} value={option.value} disabled={option.disabled}>{option.label || option.value?.toString() }</ASelect.Option>
              )
            })
          }
        </ASelect>
      </AForm.Item>
    ),
    textarea: () => (
      <AForm.Item name={name} rules={rules} style={style}>
        <AInput.TextArea {...rest} />
      </AForm.Item>
    ),
    default: () => (
      <AForm.Item name={name} rules={rules} style={style}>
        <AInput {...rest} />
      </AForm.Item>
    )
  };

  return inputs[type]();
};

export const ArrayField = ({ name, children }) => {
  return (
    <AForm.List name={name}>
      {(rows) => {
        return rows.map((row, i) => {
          return (
            <React.Fragment key={i}>
              {React.Children.map(children, (child, j) => {
                return React.cloneElement(child, {
                  key: j,
                  name: [row.name, child.props.name]
                });
              })}
            </React.Fragment>
          );
        });
      }}
    </AForm.List>
  );
};

export const ButtonGroup = ({ children }) => {
  return (
    <AForm.Item>
      <ASpace>
        {children}
      </ASpace>
    </AForm.Item>
  )
}

export const Button = ({ type = "default", submit = false, label = "Submit", onClick }) => {
  return (
    <AButton type={type} htmlType={submit ? "submit" : "button"} onClick={onClick}>
      { label }
    </AButton>
  );
};

export const Form = ({ initialValues, children, onFinish }) => {
  return (
    <AForm initialValues={initialValues} onFinish={onFinish}>
      {children}
    </AForm>
  );
};

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  inputComponent,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        inputComponent ? (
          inputComponent
        ) : (
          <AForm.Item
            name={dataIndex}
            style={{
              margin: 0
            }}
          >
            <AInput
              onKeyDown={(e) => (e.keyCode === 13 ? e.preventDefault() : "")}
            />
          </AForm.Item>
        )
      ) : (
        children
      )}
    </td>
  );
};

export const TableField = ({ name, creatable = true, deletable = true, children = [] }) => {
  const parentForm = AForm.useFormInstance();
  const initValues = (parentForm.getFieldValue(name) || []).map((row) => ({
    key: row.id,
    ...row
  }));

  const [data, setData] = useState(initValues);
  
  const columns = React.Children.map(children, (child) => {
    return {
      title: child.props.label,
      dataIndex: child.props.name,
      width: child.props.width,
      render: (value, record, index) => value?.toString(),
      default: child.props.default,
      type: child.props.type,
      onCell: child.props.editable !== false
        ? (record) => ({
            record,
            editing: isEditing(record),
            inputComponent: React.cloneElement(child, {
              onKeyDown: (e) => (e.keyCode === 13 ? e.preventDefault() : "")
            })
          })
        : undefined,
    };
  })

  const [form] = AForm.useForm();

  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      ...record
    });
    setEditingKey(record.key);
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const newParentData = [...parentForm.getFieldValue(name)];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        const newItem = { ...item, ...row }
        newData.splice(index, 1, newItem);
        setData(newData);

        newParentData.splice(index, 1, omit(newItem, 'key'));
        parentForm.setFieldsValue({ [name]: newParentData });

        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);

        newParentData.push(omit(row, 'key'));
        parentForm.setFieldsValue({ [name]: newParentData });

        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const deleteRow = async (key) => {
    const newData = [...data];
    const newParentData = [...parentForm.getFieldValue(name)];
    const index = newData.findIndex((item) => key === item.key);

    if (index > -1) {
      newData.splice(index, 1);
      newParentData.splice(index, 1);

      setData(newData);
      parentForm.setFieldsValue({ [name]: newParentData });
    }
  };

  const addNewRow = () => {
    const item = { key: `new-${+new Date()}`, ...getDefaultValues() };
    const newData = [...data, item];
    setData(newData);
    edit(item);
  };

  const getDefaultValues = () => {
    const ret = columns.reduce((acc, col) => {
      if (col.default !== undefined) {
        acc[col.dataIndex] = col.default;
      } else if (col.type === "boolean") {
        acc[col.dataIndex] = false;
      } else if (col.type === "number") {
        acc[col.dataIndex] = 0;
      } else {
        acc[col.dataIndex] = "";
      }
      return acc;
    }, {});
    console.log(ret);
    return ret;
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <AForm.List name={name}>{(rows) => null}</AForm.List> {/** dummy */}
      <AForm form={form} component={false}>
        <ATable
          components={{
            body: {
              cell: EditableCell
            }
          }}
          bordered
          columns={[
            ...columns,
            {
              title: "",
              dataIndex: "action",
              width: "80px",
              align: "right",
              render: (_, record) => {
                const editable = isEditing(record);

                return editable ? (
                  <div>
                    <ATypography.Link
                      onClick={() => save(record.key)}
                      style={{
                        marginRight: 8
                      }}
                    >
                      <CheckCircleTwoTone twoToneColor="#52c41a" />
                    </ATypography.Link>
                  </div>
                ) : (
                  <div>
                    <ATypography.Link
                      onClick={() => edit(record)}
                      style={{
                        marginRight: 8
                      }}
                    >
                      <EditTwoTone />
                    </ATypography.Link>
                    {
                      deletable
                      ? <ATypography.Link
                        onClick={() => deleteRow(record.key)}
                        style={{
                          marginRight: 8
                      }}>
                        <DeleteTwoTone twoToneColor="#eb2f96" />
                      </ATypography.Link>
                      : null
                    }
                  </div>
                );
              }
            }
          ]}
          dataSource={data}
          pagination={false}
        ></ATable>

        {creatable ? (
          <AButton
            type="dashed"
            block
            style={{ marginTop: 10 }}
            onClick={addNewRow}
          >
            + Add
          </AButton>
        ) : null}
      </AForm>
    </div>
  );
};

export const diff = (prev, curr) => {
  const noChangeSet = intersectionWith(curr, prev, isEqual)
  const deleteSet = differenceBy(prev, curr, 'id')
  const createSet = differenceBy(curr, prev, 'id')
  const updateSet = differenceBy(curr, [...noChangeSet, ...deleteSet, ...createSet], 'id')
  return {
    create: createSet,
    update: updateSet,
    delete: deleteSet,
  }
}
