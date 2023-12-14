import React, { useState } from 'react'

const CheckboxToggle = (props) => {
    const [check, setCheck] = useState(false)

    const handleCheckboxClick = () => {
            setCheck(prev => !prev)
    }
    return (
        <>   
        <div className="toggle-wrapper">   
        {check ? <div className="square" onClick={handleCheckboxClick} /> : <div className="square checked" onClick={handleCheckboxClick} /> 
        }
        <label>{props.value}</label>
        </div>
        </>
    )
    }

export default CheckboxToggle