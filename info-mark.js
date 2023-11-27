import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class InfoMark extends React.Component {
    state = {
        isOpen: false
    }

    renderPopover = () => {
        if (this.state.isOpen) {
            return (
                <div className="popover bs-popover-top" onClick={this.toggleOpen}>
                    <div className="arrow" />
                    <div className="popover-body">
                        {this.props.info}
                    </div>
                </div>
            )
        }
        return null
    }

    toggleOpen = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render = () => {
        if (!this.props.info || this.props.info === '') {
            return null
        }
        return (
            <span className="info">
                <FontAwesomeIcon onClick={this.toggleOpen} icon="question-circle" title="More info" />
                {this.renderPopover()}
            </span>
        )
    }
}

export default InfoMark
