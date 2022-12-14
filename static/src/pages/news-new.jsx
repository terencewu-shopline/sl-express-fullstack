import { message } from 'antd';
import { Form, Field, Button, ButtonGroup } from "../utils/form";
import { fetch } from "../utils/fetch";

import { useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { useTranslation } from "react-i18next";

const NewsNewPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const createNews = useRequest(
    fetch('/api/news', {
      method: 'POST',
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

  return (
    <div>
      <h1>{t('news.news_new')}</h1>
      <Form initialValues={{}} onFinish={createNews.run}>
        <Field name="title" label={t('news.title')} />
        <Field name="body" label={t('news.body')} type="textarea" row={10} showCount maxLength={100} />

        <ButtonGroup>
          <Button type="primary" submit={true} loading={createNews.loading} label={t('general.submit')} />
          <Button onClick={() => navigate('/')} label={t('general.back')} />
        </ButtonGroup>
      </Form>
    </div>
  )
}

export default NewsNewPage;
