import { Spin, message } from 'antd';
import { Form, Field, Button, ButtonGroup } from "../utils/form";
import fetch from "../utils/fetch";

import { useParams, useNavigate } from 'react-router-dom';
import useRequest from "../utils/useRequest";


const NewsShowPage = () => {
  const { id } = useParams();
  const { payload, loading, reload } = useRequest(`/api/news/${id}`)
  const navigate = useNavigate()

  const updateNews = useRequest(`/api/news/${id}`, {
    manual: true,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    then: (res) => {
      if (res.status > 400) {
        message.error(json.message);
      } else {
        message.success('Success')
      }

      navigate('/')
    },
    catch: (e) => {
      console.log(e)
      message.error('Unknown Error');
    }
  })

  if (loading) {
    return <div className="c-spinner"><Spin size="large"/></div>
  }

  return (
    <div>
      <h1>News Show</h1>
      <Form initialValues={payload} onFinish={updateNews.call}>
        <Field name="title" label="Title" />
        <Field name="body" label="Body" type="textarea" row={10} showCount maxLength={100} />

        <ButtonGroup>
          <Button type="primary" submit={true} loading={updateNews.loading} />
          <Button onClick={() => navigate(-1)} label="Back" />
        </ButtonGroup>
      </Form>
    </div>
  )
}

export default NewsShowPage;
