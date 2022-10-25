import { message } from 'antd';
import { Form, Field, Button, ButtonGroup } from "../utils/form";
import { fetch } from "../utils/fetch";

import { useParams, useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { Loading } from '../components/Loading';
import { useTranslation } from "react-i18next";
import { usePageTitle } from '../utils/page-title';


const NewsShowPage = () => {
  const { id } = useParams();
  const { data, loading } = useRequest(fetch(`/api/news/${id}`))
  const navigate = useNavigate()
  const { t } = useTranslation()
  usePageTitle(t('news.news_detail'))

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
    return <Loading />
  }

  return (
    <div>
      <h1>{t('news.news_detail')}</h1>
      <Form initialValues={data?.payload} onFinish={updateNews.run}>
        <Field name="title" label={t('news.title')} />
        <Field name="body" label={t('news.body')} type="textarea" row={10} showCount maxLength={100} />

        <ButtonGroup>
          <Button type="primary" submit={true} loading={updateNews.loading} label={t('general.submit')}/>
          <Button onClick={() => navigate('/')} label={t('general.back')} />
        </ButtonGroup>
      </Form>
    </div>
  )
}

export default NewsShowPage;
