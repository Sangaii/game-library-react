import React, { useEffect, useState } from "react";
import { Table, Button, message, Image, Form, Row, Col, Input, Select, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { games } from "@/api/Games/index";
import { getDict } from "@/api/Common/index";
import { connect } from "react-redux";
import { formatDict } from "@/utils/utils";
const { Option } = Select;
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


const TableSearchForm = (props: any) => {
  const { dict, setDict } = props
  const [form] = Form.useForm();
  const [params, setParams] = useState({});
  useEffect(() => {
    getDictList();
  }, [])

  const getDictList = () => {
    getDict({ dictName: 'dict_platform' }).then(res => {
      if (res.status === '0') {
        setDict({
          ...{
            platform: formatDict(res.data)
          }
        })
      }
    }).catch(err => {
      message.error(err)
    })
  }
  const getFields = () => {
    // 搜索框暂时先姓名 平台 创建时间（range）
    const children = [];
    children.push(<Col span={6} key='name' style={{ marginRight: 16 }}>
      {/* <Form.Item name={['search', 'name']} label="Name" rules={[{ required: false }]}> */}
      <Form.Item name='name' label="Name" rules={[{ required: false }]}>
        <Input placeholder="Please input content" />
      </Form.Item>
    </Col>);
    children.push(<Col span={6} key='platform' style={{ marginRight: 16 }}>
      <Form.Item name='platform' label="Platform">
        <Input placeholder="Please input content" />
      </Form.Item>
    </Col>);
    children.push(<Col span={6} key='createTime' style={{ marginRight: 16 }}>
      <Form.Item name='createTime' label="Create Time">
        <Input placeholder="Please input content" />
      </Form.Item>
    </Col >);
    return children;
  };

  const onFinish = (values: any) => {
    setParams(values)
  };

  return (
    <div>
      <Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={onFinish}
      >
        <Row gutter={24}>
          <Col span={20}>
            <Row>{getFields()}</Row>
          </Col>
          <Col span={4} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button
              style={{ margin: '0 8px' }}
              onClick={() => {
                form.resetFields();
              }}
            >
              Clear
            </Button>
          </Col>
        </Row>
      </Form>
      <GameList params={[params]} dict={[dict]} />
    </div>
  );
};

const GameList = (props: any) => {
  const { dict } = props

  const [tableData, setTableData] = useState([] as any);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as any);
  const hasSelected = selectedRowKeys.length > 0;

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
        console.log('record.platform', record.platform);
        for (let index = 0; index < record.platform.length; index++) {
          const element = record.platform[index];
          const randomColor = Math.floor(Math.random() * 16777215).toString(16);
          res.push(<Tag color={'#' + randomColor}>{dict[0].platform ? dict[0].platform[element] : null}</Tag>)
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
}
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
export default connect(mapStateToProps, mapDispatchToProps)(TableSearchForm)