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
                    class="slider"
                    {...props} />
                <span>{props.value}</span>
            </div>
        </>
    )
}

export default RangeSlider