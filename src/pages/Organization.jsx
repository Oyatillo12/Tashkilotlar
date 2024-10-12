import { Button, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { AddIcon } from '../assets/images/icon'
import CustomSelect from '../components/CustomSelect'
import CustomTable from '../components/CustomTable'
import { DeleteOutlined, EditOutlined, EllipsisOutlined, LineOutlined } from '@ant-design/icons';
import axios from 'axios'
import useDebounce from '../hooks/useDebounce'


function Organization() {
  const [regionId, setRegionId] = useState(null)
  const [search, setSearch] = useState(null)
  const regionList = [
    {
      value: 1,
      label: 'Toshkent shahar'
    },
    {
      value: 2,
      label: 'Samarqand viloyati'
    },
    {
      value: 3,
      label: 'Xorazm viloyati'
    },
    {
      value: 4,
      label: 'Andijon viloyati'
    },
    {
      value: 5,
      label: 'Jizzax viloyati'
    },
    {
      value: 6,
      label: 'Qoqon viloyati'
    },
  ]
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',

    },
    {
      title: 'Tashkilot Nomi',
      dataIndex: 'companyName',
    },
    {
      title: 'INN',
      dataIndex: 'inn',
    },
    {
      title: 'Holati',
      dataIndex: 'status',
    },
    {
      title: 'Manzil',
      dataIndex: 'address',
    },
    {
      title: 'Yaratilgan vakt',
      dataIndex: 'createdDate',
    },
    {
      title: 'Batafsil',
      dataIndex: 'action',
    },
  ];
  const [data, setData] = useState([
    {
      key: '1',
      id: 1,
      companyName: 'Alfa-Bank',
      inn: '1234567890',
      status: 'Faol',
      address: 'New York No. 1 Lake Park',
      createdDate: '2021-05-01',
      action: <div className='flex items-center space-x-6'>
        <EllipsisOutlined className='scale-[1.5] duration-300 hover:scale-[1.8]' />
        <EditOutlined className='scale-[1.5] duration-300 hover:scale-[1.8]' />
        <DeleteOutlined className='scale-[1.5] duration-300 hover:scale-[1.8]' />
      </div>
    }
  ])
  const [isLoading, setIsLoading] = useState(false)

  function handleSearch(e) {
    setSearch(e.target.value.toLowerCase())
  }

  const searchWaiting = useDebounce(search, 700)




  const filteredData = data.filter((item) =>
    item.companyName.toLowerCase().includes(searchWaiting) || item.address.toLowerCase().includes(searchWaiting)
  );


  useEffect(() => {
    axios.get("http://localhost:3000/organization").then(res => {
      setData(res.data.map(item => {
        item.companyName = item.companyName ? item.companyName : <LineOutlined />
        item.inn = item.inn ? item.inn : <LineOutlined />
        item.action = <div className='flex items-center space-x-6'>
          <EllipsisOutlined className='scale-[1.5] duration-300 hover:scale-[1.8]' />
          <EditOutlined className='scale-[1.5] duration-300 hover:scale-[1.8]' />
          <DeleteOutlined className='scale-[1.5] duration-300 hover:scale-[1.8]' />
        </div>
        return item
      }))

    })
  }, []);
  return (
    <div className='p-5'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-[25px] font-bold'>Tshkilotlar</h2>
          <span className='text-[15px] pl-1'>tashkilotlar (0)</span>
        </div>

        <Button icon={<AddIcon />} size='large' type='primary'>Qo'shish</Button>
      </div>
      <div className='flex items-center space-x-5 mt-6'>
        <Input onChange={handleSearch} className='w-[350px]' type='text' placeholder='Qidirish...' size='large' allowClear />
        <CustomSelect placeholder={'Tanlash...'} options={regionList} setChooseId={setRegionId} />
      </div>
      <div className='mt-5'>
        <CustomTable isLoading={isLoading} columns={columns} data={filteredData.length ? filteredData : data} />
      </div>
    </div>
  )
}

export default Organization
