import { message } from 'antd';
import { Form, Field, Button, ButtonGroup } from "../utils/form";
import { fetch } from "../utils/fetch";

import { useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { useTranslation } from "react-i18next";
import { usePageTitle } from '../utils/page-title';
import { ConfirmLeaveModal } from '../components/ConfirmLeaveModal';
import { some, isEmpty } from 'lodash';
import { useState } from 'react';
import { useAdminRouteChange } from '../lib/appBridge/useAdminRouteChange';


const NewsNewPage = () => {
  const navigate = useNavigate()

  const { t } = useTranslation()
  const [isDirty, setIsDirty] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { retryRouteChange } = useAdminRouteChange((from, to) => {
    setIsModalOpen(true);
  }, isDirty);

  const cancelModal = () => setIsModalOpen(false);

  const continueModal = () => {
    setIsModalOpen(true);
    retryRouteChange();
  }

  const onFormValuesChanged = (changedValues, values) => {
    const changed = some(values, val => !isEmpty(val));

    setIsDirty(changed);
  };

  usePageTitle(t('news.news_new'));

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
    <>
      <div>
        <h1>{t('news.news_new')}</h1>
        <Form initialValues={{}} onFinish={createNews.run} onValuesChange={onFormValuesChanged}>
          <Field name="title" label={t('news.title')} />
          <Field name="body" label={t('news.body')} type="textarea" row={10} showCount maxLength={100} />

          <ButtonGroup>
            <Button type="primary" submit={true} loading={createNews.loading} label={t('general.submit')} />
            <Button onClick={() => navigate('/')} label={t('general.back')} />
          </ButtonGroup>
        </Form>
      </div>
      <ConfirmLeaveModal 
        t={t}
        isModalOpen={isModalOpen}
        onOk={continueModal}
        onCancel={cancelModal}
      />
    </>
  )
}

export default NewsNewPage;
