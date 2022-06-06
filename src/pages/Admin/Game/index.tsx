import { ReactChild, ReactFragment, useEffect, useRef, useState } from "react";
import { Button, message, Image, Form, Row, Col, Input, Select, Tag, DatePicker, Modal } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { games } from "@/api/Games/index";
import { getDict } from "@/api/Common/index";
import { connect } from "react-redux";
import { formatDict } from "@/utils/utils";
import { platformDict } from "@/utils/dict";
import AdminTable from "@/component/AdminTable/AdminTable";
import { RenderedCell } from "_rc-table@7.24.1@rc-table/lib/interface";
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

const columns: ColumnsType<Game> = [
  {
    title: 'Id',
    dataIndex: 'gameId',
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
      for (let index = 0; index < record.platform.length; index++) {
        const element = record.platform[index];
        res.push(<Tag key={platformDict[element].key} color={platformDict[element].color}>{platformDict[element].value}</Tag>)
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

const TableSearchForm = (props: any) => {
  const { dict, setDict } = props
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [params, setParams] = useState({});
  const [tableData, setTableData] = useState([] as any);
  const [selectedRows, setSelectedRows] = useState([] as any);

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState('Add a new game');
  const [initialValues, setInitialValues] = useState({});

  const childrenRef = useRef(null);
  // console.log(childrenRef .current);

  const getGameList = (params: any) => {
    games(params).then(res => {
      if (res.status === '0') {
        setTableData(res.data);
      } else {
        message.error(res.msg);
      }
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    getGameList(params);
  }, [])

  // const getDictList = () => {
  //   getDict({ dictName: 'dict_platform' }).then(res => {
  //     if (res.status === '0') {
  //       setDict({
  //         ...{
  //           platform: formatDict(res.data),
  //           platformArr: res.data,
  //         }
  //       })
  //     }
  //   }).catch(err => {
  //     message.error(err)
  //   })
  // }

  const getFields = () => {
    // 搜索框暂时先姓名 平台 创建时间（range）
    const children = [];
    const selectOpt = [];
    for (let i = 0; i < platformDict.length; i++) {
      selectOpt.push(<Option key={platformDict[i].key}>{platformDict[i].value}</Option>);
    }
    children.push(<Col span={6} key='name' style={{ marginRight: 16 }}>
      {/* <Form.Item name={['search', 'name']} label="Name" rules={[{ required: false }]}> */}
      <Form.Item name='name' label="Name" rules={[{ required: false }]}>
        <Input placeholder="Please input content" />
      </Form.Item>
    </Col>);
    children.push(<Col span={6} key='platform' style={{ marginRight: 16 }}>
      <Form.Item name='platform' label="Platform">
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Please select"
        >
          {selectOpt}
        </Select>
      </Form.Item>
    </Col>);
    children.push(<Col span={6} key='createTime' style={{ marginRight: 16 }}>
      <Form.Item name='createTime' label="Create Time">
        <RangePicker />
      </Form.Item>
    </Col >);
    return children;
  };

  const onFinish = (values: any) => {
    console.log(values);
    setParams(values);
    getGameList(params);

    //父组件调用子组件实例
    // console.log(childrenRef.current);
    // (childrenRef .current as unknown as any).getGameList();
  };

  const getSelected = () => {
    console.log(selectedRows);
  }

  const handleSubmit = () => {
    console.log('submit');
    console.log(editForm.getFieldsValue());
  }

  const openDialog = (type: string, record = {}) => {
    console.log('******************');
    console.log(record);
    if (type === 'edit') {
      setModalTitle('Edit')
    }
    console.log(type);
    setInitialValues(record);
    setVisible(true);
  }

  return (
    <div>
      <Modal
        title={modalTitle}
        visible={visible}
        onOk={handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
      >
        <Form
          form={editForm}
          name="advanced_search"
          className="ant-advanced-search-form"
          initialValues={initialValues}
          labelCol={{ span: 5 }}>
          <Form.Item name='name' label="Name" rules={[{ required: false }]}>
            <Input placeholder="Please input content" />
          </Form.Item>
          <Form.Item name='enName' label="EnName" rules={[{ required: false }]}>
            <Input placeholder="Please input content" />
          </Form.Item>
          <Form.Item name='platform' label="Platform">
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select"
            >
              {platformDict.map((item: any) => {
                return <Option key={item.key}>{item.value}</Option>
              })}
            </Select>
          </Form.Item>
          <Form.Item name='desp' label="Description" rules={[{ required: false }]}>
            <Input.TextArea placeholder="Please input content" />
          </Form.Item>
          <Form.Item name='selfOpinion' label="Self Opinion" rules={[{ required: false }]}>
            <Input.TextArea placeholder="Please input content" />
          </Form.Item>
        </Form>
      </Modal>
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
      <div style={{ marginBottom: 16 }}>
        <Button style={{ marginRight: 8 }} type="primary" onClick={() => openDialog('add')} >
          Add
        </Button>
        <Button type="primary" disabled={!selectedRows.length} onClick={getSelected} >
          Reload
        </Button>
        <span style={{ marginLeft: 8 }}>
          {selectedRows.length > 0 ? `Selected ${selectedRows.length} items` : ''}
        </span>
      </div>
      <AdminTable
        ref={childrenRef}
        columns={columns}
        setSelect={setSelectedRows}
        dataSource={tableData}
        openDialog={openDialog}
      />
    </div>
  );
};


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