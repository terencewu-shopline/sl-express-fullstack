import qs from "qs";
import { Button, Space } from 'antd';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Field } from "../utils/form";
import { Table as ATable } from 'antd';
import { useRequest } from "ahooks";
import { ActionLink } from "../utils/action-link";
import { fetch } from "../utils/fetch";
import { useTranslation } from "react-i18next";
import { usePageTitle } from "../utils/page-title";
import { useEffect } from "react";


const NewsListPage = () => {
  const PAGE_SIZE = 2;
  const location = useLocation();
  const navigate = useNavigate();
  const querystring = qs.parse(location.search, { ignoreQueryPrefix: true })
  const page = parseInt(querystring.page) || 1
  const search = querystring.search

  const { t } = useTranslation();
  usePageTitle(t('news.news'));

  const { data, loading, refresh } = useRequest(
    fetch(`/api/news?${qs.stringify({
      limit: PAGE_SIZE,
      page,
      search,
    })}`),
    {
      refreshDeps: [page, search],
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

  return (
    <div>
      <h1>{t('news.news')}</h1>
      <div className="mb-2 grid justify-items-end">
        <Link to="/news/new">
          <Button type="primary">{t('general.create')}</Button>
        </Link>
      </div>
      <div>
        <Field label={t('general.search')} onKeyDown={(e) => e.keyCode === 13 ? navigate({ search: `?${qs.stringify({...querystring, page: 1, search: e.target.value}) }`}) : ""} defaultValue={search} />
      </div>
      <ATable
        loading={loading}
        rowKey="id"
        columns={columns}
        dataSource={data?.payload?.items}
        pagination={{
          total: data?.payload?.pagination?.total,
          pageSize: PAGE_SIZE,
          showSizeChanger: false,
          current: page,
          onChange: (page) => navigate({ search: `?${qs.stringify({...querystring, page}) }`})
        }}
      />
    </div>
  )
}

export default NewsListPage;
