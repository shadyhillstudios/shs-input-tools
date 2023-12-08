import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CheckboxToggle = (props) => {
    const [check, setCheck] = useState(false)

    const handleCheckboxClick = () => {
            setCheck(prev => !prev)
    }
    return (
        <>      {check ? <FontAwesomeIcon icon="square-check" onClick={handleCheckboxClick} /> : <FontAwesomeIcon icon={['far','square']} onClick={handleCheckboxClick} />}
        </>
    )
    }

export default CheckboxToggle