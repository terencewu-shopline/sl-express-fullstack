import { Spin, message } from 'antd';
import { Form, Field, Button } from "../utils/form";
import fetch from "../utils/fetch";

import { useParams, useNavigate } from 'react-router-dom';
import useRequest from "../utils/useRequest";


const NewsShowPage = () => {
  const { id } = useParams();
  const { payload, loading, reload } = useRequest(`/api/news/${id}`)
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    try {
      const res = await fetch(`/api/news/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const json = await res.json()

      if (res.status > 400) {
        // message.error(json.message);
      } else {
        message.success('Success')
      }
      console.log(json)
      await reload()
    } catch (e) {
      console.log(e)
      message.error('Unknown Error');
    }
  };


  if (loading) {
    return <div className="c-spinner"><Spin size="large"/></div>
  }

  return (
    <div>
      <h1>News Show</h1>
      <Form initialValues={payload} onFinish={onSubmit}>
        <Field name="title" label="Title" />
        <Field name="body" label="Body" />

        <Button type="primary" submit={true} />
        <Button onClick={() => navigate(-1)} label="Back" />
      </Form>
    </div>
  )
}

export default NewsShowPage;
