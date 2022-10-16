import { Spin, message } from 'antd';
import { Form, Field, Button, ButtonGroup } from "../utils/form";
import { fetch } from "../utils/fetch";

import { useParams, useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';


const NewsShowPage = () => {
  const { id } = useParams();
  const { data, loading } = useRequest(fetch(`/api/news/${id}`))
  const navigate = useNavigate()

  const updateNews = useRequest(
    fetch(`/api/news/${id}`, {
      method: 'PUT',
    }),
    {
      manual: true,
      onSuccess: ({ payload, status }) => {
        if (status >= 400) {
          return message.error(payload.message);
        }

        message.success('Success')
        navigate('/')
      },
      onError: (e) => {
        console.log(e)
        message.error('Unknown Error');
      }
    }
  )

  if (loading) {
    return <div className="c-spinner"><Spin size="large"/></div>
  }

  return (
    <div>
      <h1>News Show</h1>
      <Form initialValues={data?.payload} onFinish={updateNews.run}>
        <Field name="title" label="Title" />
        <Field name="body" label="Body" type="textarea" row={10} showCount maxLength={100} />

        <ButtonGroup>
          <Button type="primary" submit={true} loading={updateNews.loading} />
          <Button onClick={() => navigate('/')} label="Back" />
        </ButtonGroup>
      </Form>
    </div>
  )
}

export default NewsShowPage;
