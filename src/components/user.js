import React, { useEffect, useState } from 'react'
import { Button, Form, InputNumber, Table, ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}

const columns = [
  { title: '用户名', dataIndex: 'userName'},
  { title: '性别', dataIndex: 'sex'},
  { title: '年龄', dataIndex: 'age'}
]

export default ({ userName } = {}) => {
  const [ form ] = Form.useForm()
  const [isClient, setIsClient] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setIsClient(true)
    console.log('client render', userName)
  }, [])

  const onSubmit = async () => {
    const values = await form.validateFields()
    setLoading(true)
    const response = await fetch("/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values)
    })
    const result = await response.json()
    setLoading(false)
    setDataSource(result.data)
  }
  
  return (
    <html>
      <body style={{ margin: 20}}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>hello, {userName}</div>
        {
          isClient ? (
            <div style={{ maxWidth: 1200, margin: '0 auto'}}>
              <ConfigProvider locale={zhCN.default}>
                <Form
                  {...layout}
                  colon={false}
                  form={form}
                  name="control-hooks"
                >
                  <Form.Item
                    name="userLength"
                    label="用户数量："
                    rules={[
                      {
                        required: true,
                        message: '请填写用户数量'
                      },
                    ]}
                  >
                    <InputNumber placeholder='请输入' style={{ width: 200 }} min={1} max={10000} />
                  </Form.Item>
                  <Form.Item label=" ">
                    <Button loading={loading} onClick={onSubmit} type="primary">查询</Button>
                  </Form.Item>
                </Form>
                <Table
                  loading={loading}
                  columns={columns}
                  dataSource={dataSource}
                  scroll={{
                    y: 500,
                  }}
                  pagination={{
                    position: ['bottomCenter'],
                    showSizeChanger: true,
                    pageSizeOptions: [10, 20, 50]
                  }}
                />
              </ConfigProvider>
            </div>
          ) : null
        }
        
      </body>
    </html>
  )
}

