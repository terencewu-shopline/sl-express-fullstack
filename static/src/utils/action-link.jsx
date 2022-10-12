import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm } from "antd";
import { useState } from "react";
import fetch from "./fetch";
import useRequest from "./useRequest";


export const ActionLink = ({ method, url, body, type = 'link', confirm, then, catch: _catch, children }) => {
  const { call, loading } = useRequest(url, {
    manual: true,
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    then,
    catch: _catch,
  })

  return (
    confirm
      ?
        <Popconfirm title={confirm} icon={<QuestionCircleOutlined style={{ color: 'red' }} />} onConfirm={() => call(body)}>
          <Button loading={loading} type={type}>{children}</Button>
        </Popconfirm>
      :
        <Button loading={loading} type={type} onClick={() => call(body)}>{children}</Button>
  )
}
