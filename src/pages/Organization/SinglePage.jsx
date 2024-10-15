import React, { useEffect, useState } from 'react'
import { useAxios } from '../../hooks/useAxios'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeftOutlined, EditOutlined, LineOutlined } from '@ant-design/icons'
import { Button } from 'antd'

function SinglePage() {
  const navigate = useNavigate()

  const { id } = useParams()
  const [singleData, setSingleData] = useState({})
  useEffect(() => {
    useAxios().get(`/organization/${id}`).then(res =>
      setSingleData(res.data)
    )
  })

  return (
    <div className='p-5'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-5'>
          <ArrowLeftOutlined onClick={() => navigate(-1)} className='scale-[1.5]' />
          <h2 className='text-[25px] font-bold'>{singleData.companyName ? singleData.companyName : <LineOutlined />}</h2>
        </div>
        <Button icon={<EditOutlined />} size='large' type='primary'>Tahrirlash</Button>
      </div>
      <ul className='mt-10 border-gray-400 flex  border-[2px] rounded-lg shadow p-4 w-[50%]'>
        <li className='space-y-4 w-[50%]'>
          <div className='flex flex-col space-y-2'>
            <span className='text-[15px] leading-[18px] text-gray-400'>ID</span>
            <strong className='text-[20px] leading-[22px] font-semibold'>{singleData.id}</strong>
          </div>
          <div className='flex flex-col space-y-2'>
            <span className='text-[15px] leading-[18px] text-gray-400'>Tashkilot Nomi</span>
            <strong className='text-[20px] leading-[22px] font-semibold'>{singleData.companyName ? singleData.companyName : <LineOutlined />}</strong>
          </div>
          <div className='flex flex-col space-y-2'>
            <span className='text-[15px] leading-[18px] text-gray-400'>Inn</span>
            <strong className='text-[20px] leading-[22px] font-semibold'>{singleData.inn ? singleData.inn : <LineOutlined />}</strong>
          </div>
          <div className='flex flex-col space-y-2'>
            <span className='text-[15px] leading-[18px] text-gray-400'>Holati</span>
            <strong className='text-[20px] leading-[22px] font-semibold'>{singleData.status}</strong>
          </div>
        </li>
        <li className='space-y-4 w-[50%]'>
          <div className='flex flex-col space-y-2'>
            <span className='text-[15px] leading-[18px] text-gray-400'>Hudud</span>
            <strong className='text-[20px] leading-[22px] font-semibold'>{singleData.regionName}</strong>
          </div>
          <div className='flex flex-col space-y-2'>
            <span className='text-[15px] leading-[18px] text-gray-400'>Manzil</span>
            <strong className='text-[20px] leading-[22px] font-semibold'>{singleData.address}</strong>
          </div>
          <div className='flex flex-col space-y-2'>
            <span className='text-[15px] leading-[18px] text-gray-400'>Yaratilgan vakt</span>
            <strong className='text-[20px] leading-[22px] font-semibold'>{singleData.createdDate}</strong>
          </div>
        </li>
      </ul>
    </div >
  )
}

export default SinglePage
