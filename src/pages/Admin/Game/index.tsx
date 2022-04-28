import React, { ReactElement, useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { Table, Button, message, Image, Form, Row, Col, Input, Select, Tag, DatePicker } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { games } from "@/api/Games/index";
import { getDict } from "@/api/Common/index";
import { connect } from "react-redux";
import { formatDict } from "@/utils/utils";
import AdminTable from "@/component/AdminTable/AdminTable";
const { Option } = Select;
const { RangePicker } = DatePicker
const imgUrl = process.env.BASE_IMAGE_URL



const TableSearchForm = (props: any) => {
  const { dict, setDict } = props
  const [form] = Form.useForm();
  const [params, setParams] = useState({});
  const childrenRef = useRef(null);
  // console.log(childrenRef .current);

  useEffect(() => {
    getDictList();
  }, [])

  const getDictList = () => {
    getDict({ dictName: 'dict_platform' }).then(res => {
      if (res.status === '0') {
        setDict({
          ...{
            platform: formatDict(res.data),
            platformArr: res.data,
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
    const selectOpt = [];
    if (dict.platformArr && dict.platformArr.length) {
      for (let i = 0; i < dict.platformArr.length; i++) {
        selectOpt.push(<Option key={dict.platformArr[i].key}>{dict.platformArr[i].value}</Option>);
      }
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
    setParams(values);
    console.log(childrenRef.current);
    // (childrenRef .current as unknown as any).getGameList();
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
      <AdminTable ref={childrenRef} params={[params]} dict={[dict]} />
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