import React from 'react'

export default function Toast({theme, textTheme, text, show}) {
    return (
        <div className={`position-fixed bottom-0 end-0${theme}${textTheme} px-4 md:px-5 py-2 rounded me-2 mb-2`}>
            <div className='d-flex justify-content-between align-items-center gap-5 border-bottom '>
                <p className='mb-1 '>Message:</p>
                <button className='btn btn-light rounded-circle mb-1' onClick={()=>show(false)}>X</button>
            </div>
            <p>
                {text}
            </p>
        </div>
    )
}
