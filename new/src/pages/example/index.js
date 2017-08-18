import React, { Component } from 'react'
import { connect } from 'react-redux'

class Index extends Component {

    // clickHandle() {

    // }
    render() {
        const { name } = this.props;
        return (
            <div className="absolute-middle txt-center" style={{ height: '200px' }}>
                <img alt="DTStack" src="img/logo@2x.png" />
                <h1>React Starter Kit.</h1>
                <h2>
                    <a target="_blank" rel="noopener noreferrer" href="http://git.dtstack.cn/ziv/dt-react-starter/blob/master/README.md">
                        脚手架说明文档
                    </a>
                </h2>
                <button type="button">{name}</button>
            </div>
        )
    }
}

export default connect((state) => {
    const { name } = state.project;
    return { name };
})(Index);
