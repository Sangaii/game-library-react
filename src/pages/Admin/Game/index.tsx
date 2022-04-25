import React, { useEffect, useState } from "react";
import { Table, Button, message, Image } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { games } from "@/api/Games/index";

const imgUrl = process.env.BASE_IMAGE_URL

interface Game {
  id: string
  name: string
  img: string
  desp: string
}
const columns: ColumnsType<Game> = [
  {
    title: 'Id',
    dataIndex: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Image',
    dataIndex: 'img',
    render: (_: any, record: Game) => {
      return (
        <Image width={40} height={40} src={imgUrl + record.img}
        />
      )
    }
  },
  {
    title: 'Description',
    dataIndex: 'desp',
  },
];

const Game = () => {

  const [tableData, setTableData] = useState([] as any);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as any);
  const hasSelected = selectedRowKeys.length > 0;
  useEffect(() => {
    games().then(res => {
      if (res.status === '0') {
        setTableData(res.data);
      } else {
        message.error(res.msg);
      }
    }).catch(err => {
      console.log(err);
    })
  }, [])

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setLoading(false)
      setSelectedRowKeys([])
    }, 1000);
  };

  const onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (<div>
    <div style={{ marginBottom: 16 }}>
      <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
        Reload
      </Button>
      <span style={{ marginLeft: 8 }}>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
      </span>
    </div>
    <Table<Game> rowKey="id" rowSelection={rowSelection} columns={columns} dataSource={tableData} />
  </div>)
}
export default Game