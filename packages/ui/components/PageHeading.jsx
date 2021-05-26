import React from 'react'
import { Space, Tooltip } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import PageTitle from './PageTitle'

export default function PageHeading({
  title,
  description,
  renderEdit,
}) {
  return (
    <Space>
      <PageTitle title={title} />
      {description ? (
        <Tooltip placement="bottom" title={description}>
          <InfoCircleOutlined />
        </Tooltip>
      ) : null}
      {renderEdit ? renderEdit() : null}
    </Space>
  )
}
