import React, { useState } from 'react'

const CheckboxInput = ({ onChange, checked, ...props }) => {
    const [check, setCheck] = useState(false)

    const handleCheckboxClick = (event) => {
        setCheck(event.target.checked)
    }
    return (
        <>      <div className="checkbox-input">
                <input type="checkbox" className="checkbox" checked={check} onChange={handleCheckboxClick}
                {...props} />
                </div>
        </>
    )
    }

export default CheckboxInput