import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm } from "antd";
import { useState } from "react";
import fetch from "./fetch";


export const ActionLink = ({ method, url, body, type = 'link', confirm, then, children }) => {
  const [loading, setLoading] = useState(false)

  const onClick = async () => {
    try {
      setLoading(true)

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      })

      const json = await res.json()

      if (res.status > 400) {
        message.error(json.message);
      } else {
        message.success('Success')
      }
    } catch (e) {
      console.log(e)
      message.error('Unknown Error');
    } finally {
      setLoading(false)
    }

    await then?.()
  };

  return (
    confirm
    ?
      <Popconfirm title={confirm} icon={<QuestionCircleOutlined style={{ color: 'red' }} />} onConfirm={onClick}>
        <Button loading={loading} type={type}>{children}</Button>
      </Popconfirm>
    :
      <Button loading={loading} type={type} onClick={onClick}>{children}</Button>
  )
}
