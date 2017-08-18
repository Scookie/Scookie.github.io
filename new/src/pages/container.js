import React, { Component } from 'react'
import PropTypes from 'prop-types'

const propType = {
    children: PropTypes.node,
}
const defaultPro = {
    children: [],
}

export default class Container extends Component {
    render() {
        const { children } = this.props
        return (
            <div className="container">
                { children || "i'm container." }
            </div>
        )
    }
}
Container.propTypes = propType
Container.defaultProps = defaultPro

