import { useState } from "react";
import qs from "qs";
import { Spin } from 'antd';
import { Link } from "react-router-dom";
import useRequest from "../utils/useRequest";
import { Field } from "../utils/form";
import { Table as ATable, Input as AInput } from 'antd';


const NewsListPage = () => {
  const [page, setPage] = useState(1);

  const { payload, loading } = useRequest(`/api/news?${qs.stringify({
    limit: 10,
    page,
  })}`)

  const columns = [
    { title: 'id', dataIndex: 'id' },
    { title: 'title', dataIndex: 'title' },
    { title: 'body', dataIndex: 'body' },
    { title: 'action', render: (value, record) => {
        return <Link to={`/news/${record.id}`}>detail</Link>
    }}
  ]

  if (loading) {
    return <div className="c-spinner"><Spin size="large"/></div>
  }

  return (
    <div>
      <h1>News</h1>
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
          pageSize: 10,
          showSizeChanger: false,
          current: page,
          onChange: (page) => setPage(page)
        }}
      />
    </div>
  )
}

export default NewsListPage;
