
import { Pagination } from '@mui/material'
import React from 'react'

const CustomPagination = ({setPage, numOfPages=10}) => {
  // console.log(setPage)
  const handleChange =(page) => {
    setPage(page);
    
    window.scroll(0, 0)
  }
  return (
    <div style={{
      width: "100%",
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 100,
    }}>
      <Pagination count={numOfPages} onChange={(event)=> handleChange(event.target.textContent)} />
    </div>
  )
}

export default CustomPagination