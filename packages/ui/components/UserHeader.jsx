import React from 'react'
import { useQuery } from 'react-query'
import { Auth } from 'aws-amplify'
import { Avatar, Spin } from 'antd'

export default function UserHeader({
  getContent,
}) {
  const { data, isLoading } = useQuery('userInfo', () => Auth.currentAuthenticatedUser())
  return (
    <div>
      <Avatar size={72}>
        {isLoading ? <Spin /> : data?.attributes.name[0]}
      </Avatar>
      <div>
        <h3>
          {getContent
            ? getContent(data?.attributes).title
            : `Welcome ${data?.attributes?.name}, we are glad you are here!`}
        </h3>
        <span>
          {getContent
            ? getContent(data?.attributes).description
            : `Our goal today is to get you one step ahead in your gene
          therapy treatment roadmap`}
        </span>
      </div>
    </div>
  )
}
