import React, { Component } from 'react'

import Api from '../../api'

export default class Index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            msg: 'success',
        }
    }

    login() {
        Api.login({
            name: 'test',
            password: '123456',
        }).then((res) => {
            this.setState({
                msg: res,
            })
        })
    }

    render() {
        return (
            <div className="absolute-middle txt-center">
                <img alt="DTStack" src="img/logo@2x.png" />
                <h1>User Login.</h1>
                <p>{this.state.msg}</p>
                <button onClick={this.login}>Login</button>
            </div>
        )
    }
}

