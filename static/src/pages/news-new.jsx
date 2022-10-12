import { message } from 'antd';
import { Form, Field, Button, ButtonGroup } from "../utils/form";
import fetch from "../utils/fetch";

import { useParams, useNavigate } from 'react-router-dom';


const NewsNewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    try {
      const res = await fetch(`/api/news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const json = await res.json()

      if (res.status > 400) {
        message.error(json.message);
      } else {
        message.success('Success')
      }

      navigate('/')
    } catch (e) {
      console.log(e)
      message.error('Unknown Error');
    }
  };

  return (
    <div>
      <h1>News Create</h1>
      <Form initialValues={{}} onFinish={onSubmit}>
        <Field name="title" label="Title" />
        <Field name="body" label="Body" type="textarea" row={10} showCount maxLength={100} />

        <ButtonGroup>
          <Button type="primary" submit={true} />
          <Button onClick={() => navigate(-1)} label="Back" />
        </ButtonGroup>
      </Form>
    </div>
  )
}

export default NewsNewPage;
