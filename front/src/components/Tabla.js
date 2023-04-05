import React from 'react';
import DataTable from 'react-data-table-component';
import Checkbox from '@mui/material/Checkbox'
import ArrowDownward from '@mui/icons-material/ArrowDownward';

const sortIcon = <ArrowDownward />;
const selectProps = { indeterminate: isIndeterminate => isIndeterminate };


const Tabla = (props) => {
  return (
    <DataTable
        pagination
        responsive
        subHeaderWrap
        selectableRowsComponent={Checkbox}
        selectableRowsComponentProps={selectProps}
        sortIcon={sortIcon}
        dense
        {...props}
    />
  )
}

export default Tabla