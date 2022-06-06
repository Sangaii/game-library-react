import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Table, Button } from 'antd';
import { getDict } from "@/api/Common/index";
import { connect } from "react-redux";
import { formatDict } from "@/utils/utils";


const AdminTable = forwardRef((props: any, ref: any) => {
  const { columns, dataSource, setSelect, openDialog } = props

  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as any);
  const hasSelected = selectedRowKeys.length > 0;

  let optColumns = [...columns, ...[
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: any) => {
        return (
          <div>
            <a style={{ marginRight: 8 }} onClick={() => openDialog('edit', record)}>Edit</a>
            {/* <a onClick={() => showDetail}>Info</a> */}
          </div >
        )
      }
    },
  ]];

  useImperativeHandle(ref, () => ({
    // 父组件调用子组件实例
    // getGameList
  }));

  useEffect(() => {
    console.log(123);
  }, [])

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setLoading(false)
      setSelectedRowKeys([])
    }, 6000);
  };



  const onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
    setSelect(selectedRowKeys)
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
    <Table rowKey="id" rowSelection={rowSelection} columns={optColumns} dataSource={dataSource} />
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