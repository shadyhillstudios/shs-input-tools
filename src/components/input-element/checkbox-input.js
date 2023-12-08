import React, { useState } from 'react'

const CheckboxInput = ({ onChange, checked, ...props }) => {
    const [check, setCheck] = useState(false)

    const handleCheckboxClick = (event) => {
        setCheck(event.target.checked)
    }
    return (
        <>
                <input type="checkbox" checked={check} onChange={handleCheckboxClick}
                {...props} />
        </>
    )
    }

export default CheckboxInput