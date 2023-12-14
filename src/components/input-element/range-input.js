import React from "react"

const RangeSlider = (props) => {

    return (
        <>
            <div className="range-slider">
                <input
                    type="range"
                    min={props.min}
                    max={props.max}
                    value={props.value}
                    step={props.step}
                    {...props}
                    className={`${props.className} slider`} />
                <span>{props.value}</span>
            </div>
        </>
    )
}

export default RangeSlider