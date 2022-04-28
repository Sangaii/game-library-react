import React, { ReactElement, useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { Table, Button, message, Image, Form, Row, Col, Input, Select, Tag, DatePicker } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { games } from "@/api/Games/index";
import { getDict } from "@/api/Common/index";
import { connect } from "react-redux";
import { formatDict } from "@/utils/utils";
const { Option } = Select;
const { RangePicker } = DatePicker
const imgUrl = process.env.BASE_IMAGE_URL


interface Game {
  id: string
  name: string
  img: string
  desp: string
  classify: string
  platform: string
  label: string
  maker: string
  createTime: string
  visits: string
}
const AdminTable = forwardRef((props: any, ref: any) => {
  const { dict } = props
  console.log('--------------------');
  console.log(props);
  console.log(ref);

  const [tableData, setTableData] = useState([] as any);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as any);
  const hasSelected = selectedRowKeys.length > 0;

  useImperativeHandle(ref, () => ({
    getGameList
  }));

  // 因为需要用到store，所以在组件里初始化
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
      title: 'Platform',
      dataIndex: 'platform',
      render: (_: any, record: Game) => {
        let res = [];
        if (dict[0] && dict[0].platform) {
          for (let index = 0; index < record.platform.length; index++) {
            const element = record.platform[index];
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            res.push(<Tag key={randomColor} color={'#' + randomColor}>{dict[0].platform[element]}</Tag>)
          }
        }
        return res
      }
    },
    {
      title: 'Description',
      dataIndex: 'desp',
    },
    {
      title: 'Classify',
      dataIndex: 'classify',
    },
    {
      title: 'Label',
      dataIndex: 'label',
    },
    {
      title: 'Maker',
      dataIndex: 'maker',
    },
    {
      title: 'Create Time',
      dataIndex: 'createTime',
    },
    {
      title: 'Visits',
      dataIndex: 'visits',
    },
  ];
  useEffect(() => {
    getGameList();
  }, [])

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setLoading(false)
      setSelectedRowKeys([])
    }, 6000);
  };

  const getGameList = () => {
    games().then(res => {
      if (res.status === '0') {
        setTableData(res.data);
      } else {
        message.error(res.msg);
      }
    }).catch(err => {
      console.log(err);
    })
  }


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
})


const mapStateToProps = (state: any, ownProps: any) => {
  // const { byIds, allIds } = state.todos || {};
  // const todos =
  //   allIds && allIds.length
  //     ? allIds.map(id => (byIds ? { ...byIds[id], id } : null))
  //     : null;
  return {
    dict: state.system.dict
  };
};

const mapDispatchToProps = {
  // ... normally is an object full of action creators
  setDict: (dict: any) => ({ type: 'SET_DICT', dict }),
}

//组件内部需要传{ forwardRef: true }
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(AdminTable)