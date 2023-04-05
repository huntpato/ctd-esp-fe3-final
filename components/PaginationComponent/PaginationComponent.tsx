import React, { ChangeEvent, FC } from "react";
import { Pagination } from '@mui/material';
import { useRouter } from "next/router";

interface Props {
    total:number,
    offset: number,
    limit: number
}

const PaginationComponent : FC<Props> = ({ total, offset, limit }) => {

    const router = useRouter();

    const handlePageChange = (event : React.ChangeEvent<unknown>, value: number) =>{
        const newOffset = (value - 1) * limit;
        router.push(`/?offset=${newOffset}`)
    }

  return (
    <>
        <Pagination count={Math.round(total/limit)} page={offset/limit+1} onChange={handlePageChange} sx={{marginBottom: "15px"}}></Pagination>
    </>
  )
}

export default PaginationComponent