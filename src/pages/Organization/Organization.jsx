import { Button, Input, Popover } from 'antd'
import React, { useEffect, useState } from 'react'
import { AddIcon } from '../../assets/images/icon'
import CustomSelect from '../../components/CustomSelect'
import CustomTable from '../../components/CustomTable'
import { DeleteOutlined, EditOutlined, EllipsisOutlined, LineOutlined } from '@ant-design/icons';
import { useAxios } from '../../hooks/useAxios';
import { useNavigate } from 'react-router-dom'

function Organization() {
  const navigate = useNavigate()
  const [refresh, setRefresh] = useState(false)
  const [regionId, setRegionId] = useState("")
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
      dataIndex: 'index',

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
      title: 'FIlial',
      dataIndex: 'regionName',
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
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  function handleSearch(e) {
    setIsLoading(true)
    if (e.target.value) {
      const fileredData = data.filter(item => item.companyName.length > 0 ? item.companyName.toLowerCase().includes(e.target.value.toLowerCase()) : "");
      setTimeout(() => {
        setData(fileredData)
        setIsLoading(false)
      }, 1000)
    } else {
      setTimeout(() => setRefresh(!refresh), 1000)

    }
  }


  useEffect(() => {
    useAxios().get(`/organization?regionId=${regionId}`).then(res => {
      setIsLoading(false)
      setData(res.data.map((item, index) => {
        item.index = index + 1;
        item.address = <Popover placement="top"  content={item.address}>
          <p className='text-ellipsis cursor-pointer whitespace-nowrap overflow-hidden w-[180px]'>{item.address}</p>
        </Popover>
        item.companyName = item.companyName ? item.companyName : <LineOutlined />
        item.inn = item.inn ? item.inn : <LineOutlined />
        switch (item.status) {
          case "1":
            item.status = "Faol"
            break;
          case "2":
            item.status = "Faol emas"
            break;
          case "3":
            item.status = "Jarayonda"
            break;
        }
        item.action = <div className='flex items-center space-x-6'>
          <EllipsisOutlined onClick={() => navigate(`${item.id}`)} className='scale-[1.5] duration-300 hover:scale-[1.8]' />
          <DeleteOutlined className='scale-[1.5] duration-300 hover:scale-[1.8]' />
        </div>
        return item
      }))
    })
  }, [refresh, regionId]);


  return (
    <div className='p-5'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-[25px] font-bold'>Tshkilotlar</h2>
          <span className='text-[15px] pl-1'>tashkilotlar ({data.length})</span>
        </div>

        <Button onClick={() => navigate('add')} icon={<AddIcon />} size='large' type='primary'>Qo'shish</Button>
      </div>
      <div className='flex items-center space-x-5 mt-6'>
        <Input onChange={handleSearch} className='w-[350px]' type='text' placeholder='Qidirish...' size='large' allowClear />
        <CustomSelect width={'350px'} setIsLoading={setIsLoading} placeholder={'Tanlash...'} options={regionList} setChooseId={setRegionId} />
      </div>
      <div className='mt-5'>
        <CustomTable isLoading={isLoading} columns={columns} data={data} />
      </div>
    </div>
  )
}

export default Organization
