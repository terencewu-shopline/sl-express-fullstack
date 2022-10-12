import { useState } from "react";
import qs from "qs";
import { Button, Col, Row, Space, Spin } from 'antd';
import { Link } from "react-router-dom";
import useRequest from "../utils/useRequest";
import { Field } from "../utils/form";
import { Table as ATable, Input as AInput } from 'antd';
import { ActionLink } from "../utils/action-link";


const NewsListPage = () => {
  const PAGE_SIZE = 2;
  const [page, setPage] = useState(1);

  const { payload, loading, reload } = useRequest(`/api/news?${qs.stringify({
    limit: PAGE_SIZE,
    page,
  })}`)

  const columns = [
    { title: 'id', dataIndex: 'id' },
    { title: 'title', dataIndex: 'title' },
    { title: 'body', dataIndex: 'body' },
    { title: 'action', width: '20%', render: (value, record) => {
      return (
        <Space size="middle">
          <Link to={`/news/${record.id}`}>detail</Link>
          <ActionLink method="DELETE" url={`/api/news/${record.id}`} confirm="Are you sure?" then={reload}>delete</ActionLink>
        </Space>
      )
    }}
  ]

  if (loading) {
    return <div className="c-spinner"><Spin size="large"/></div>
  }

  return (
    <div>
      <h1>News</h1>
      <div className="mb-2 grid justify-items-end">
        <Link to="/news/new">
          <Button type="primary">Create</Button>
        </Link>
      </div>
      <div>
        <Field label="Search" onKeyDown={(e) => e.keyCode === 13 ? setSearch(e.target.value) : ""} />
      </div>
      <ATable
        loading={loading}
        rowKey="id"
        columns={columns}
        dataSource={payload.items}
        pagination={{
          total: payload?.pagination?.total,
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
