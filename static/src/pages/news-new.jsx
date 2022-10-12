import { message } from 'antd';
import { Form, Field, Button, ButtonGroup } from "../utils/form";
import fetch from "../utils/fetch";

import { useParams, useNavigate } from 'react-router-dom';
import useRequest from '../utils/useRequest';


const NewsNewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate()

  const createNews = useRequest('/api/news', {
    manual: true,
    method: 'POST',
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

  return (
    <div>
      <h1>News Create</h1>
      <Form initialValues={{}} onFinish={createNews.call}>
        <Field name="title" label="Title" />
        <Field name="body" label="Body" type="textarea" row={10} showCount maxLength={100} />

        <ButtonGroup>
          <Button type="primary" submit={true} loading={createNews.loading} />
          <Button onClick={() => navigate(-1)} label="Back" />
        </ButtonGroup>
      </Form>
    </div>
  )
}

export default NewsNewPage;
