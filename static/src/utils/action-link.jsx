import { QuestionCircleOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Popconfirm } from "antd";
import { fetch } from "./fetch";


export const ActionLink = ({ method, url, body, type = 'link', confirm, onSuccess, onError, children }) => {
  const { run, loading } = useRequest(
    fetch(url, {
      method,
      body,
    }),
    {
      manual: true,
      onSuccess,
      onError,
    }
  )

  return (
    confirm
      ?
        <Popconfirm title={confirm} icon={<QuestionCircleOutlined style={{ color: 'red' }} />} onConfirm={() => run()}>
          <Button loading={loading} type={type}>{children}</Button>
        </Popconfirm>
      :
        <Button loading={loading} type={type} onClick={() => run()}>{children}</Button>
  )
}
