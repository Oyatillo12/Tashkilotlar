import React from 'react';
import { Table } from 'antd';

const CustomTable = ({isLoading,columns, data}) => {
    return (
        <Table
            columns={columns}
            dataSource={data}
            loading={isLoading}
        />
    );

}
export default CustomTable;