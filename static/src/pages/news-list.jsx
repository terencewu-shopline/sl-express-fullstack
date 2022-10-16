import { useState } from "react";
import qs from "qs";
import { Button, Col, Row, Space } from 'antd';
import { Link } from "react-router-dom";
import { Field } from "../utils/form";
import { Table as ATable, Input as AInput } from 'antd';
import { useRequest } from "ahooks";
import { ActionLink } from "../utils/action-link";
import { fetch } from "../utils/fetch";
import { Loading } from "../components/Loading";
import { useTranslation } from "react-i18next";


const NewsListPage = () => {
  const PAGE_SIZE = 2;
  const [page, setPage] = useState(1);
  const { t } = useTranslation();

  const { data, loading, refresh } = useRequest(
    fetch(`/api/news?${qs.stringify({
      limit: PAGE_SIZE,
      page,
    })}`),
    {
      refreshDeps: [page],
    }
  );

  const columns = [
    { title: t('news.id'), dataIndex: 'id' },
    { title: t('news.title'), dataIndex: 'title' },
    { title: t('news.body'), dataIndex: 'body' },
    { title: t('general.actions'), width: '20%', render: (value, record) => {
      return (
        <Space size="middle">
          <Link to={`/news/${record.id}`}>{t('general.detail')}</Link>
          <ActionLink method="DELETE" url={`/api/news/${record.id}`} confirm={t('general.are_your_sure_?')} onSuccess={refresh}>{t('general.delete')}</ActionLink>
        </Space>
      )
    }}
  ]

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <h1>{t('news.news')}</h1>
      <div className="mb-2 grid justify-items-end">
        <Link to="/news/new">
          <Button type="primary">{t('general.create')}</Button>
        </Link>
      </div>
      <div>
        <Field label={t('general.search')} onKeyDown={(e) => e.keyCode === 13 ? setSearch(e.target.value) : ""} />
      </div>
      <ATable
        loading={loading}
        rowKey="id"
        columns={columns}
        dataSource={data.payload?.items}
        pagination={{
          total: data.payload?.pagination?.total,
          pageSize: PAGE_SIZE,
          showSizeChanger: false,
          current: page,
          onChange: (page) => setPage(page)
        }}
      />
    </div>
  )
}

export default NewsListPage;
