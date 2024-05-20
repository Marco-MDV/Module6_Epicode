import React from 'react'

export default function Pagination({setPageNumber, pageNumber, totPages}) {
    const previousPage =()=>{
        if (pageNumber > 1) {
            setPageNumber(--pageNumber)
        }
    }
    const nextPage =()=>{
        if (pageNumber < totPages) {
            setPageNumber(++pageNumber)
        }
    }
  return (
    <div className=' position-fixed bottom-0 start-50 translate-middle-x  d-flex justify-content-between align-items-center  mb-3 '>
        <button className='btn btn-success' onClick={()=>previousPage()}>Previous</button>
        <button className='btn btn-success' onClick={()=>nextPage()}>Next</button>
    </div>
  )
}
