import React, { useState } from "react"

const RenderKeywordList = (props) => {
    const [tempValue, setTempValue] = useState('')
    const [value, setValue] = useState('')

    const handleTempSave = (evt) => {
        if (evt.keyCode === 13) {
            evt.preventDefault()
            evt.stopPropagation()
            let newValue = value !== '' ? value + `|${evt.target.value}` : evt.target.value
            setValue(newValue)
            setTempValue('')
        }
    }

    const removeKeyword = (idx) => {
        let keywords = value.split('|')
        keywords.splice(idx, 1)
        setValue(keywords.join('|'))
    }

    let keywords = value.split('|')
    let allKeywords = []
    keywords.forEach((keyword, idx) => {
        if (keyword !== '') {
            allKeywords.push(
                <div className="item" key={idx} onClick={() => removeKeyword(idx)}>
                    {keyword} <span>X</span>
                </div>
            )
        }
    })

    return (
        <>
            <input
                type="text"
                id="tempKeyword"
                className="form-control"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                onKeyDown={handleTempSave}
                placeholder={props.placeholder} />
            <div className="selections left-align">{allKeywords}</div>
            <input
                type="hidden"
                id={props.id}
                name={props.name}
                value={value} />
        </>
    )
}

export default RenderKeywordList