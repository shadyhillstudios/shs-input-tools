import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CheckboxToggle = (props) => {
    const [check, setCheck] = useState(false)

    const handleCheckboxClick = () => {
            setCheck(prev => !prev)
    }
    return (
        <>   
        <div className="toggle-wrapper">   
        {check ? <FontAwesomeIcon icon="square-check" size="xl" onClick={handleCheckboxClick} /> : <FontAwesomeIcon icon={['far','square']} size="xl" onClick={handleCheckboxClick} /> 
        }
        <label>{props.value}</label>
        </div>
        </>
    )
    }

export default CheckboxToggle