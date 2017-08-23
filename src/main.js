import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import { hashHistory,IndexRoute,Router, Route, Link } from 'react-router'
import { Layout, Menu, Breadcrumb } from 'antd'
const { Header, Content, Footer } = Layout;

import Resume from "./container/resume/resume"
import HalfwayAction from "./container/halfwayAction/halfwayAction"
import IrregularWork from "./container/irregularWork/irregularWork"

import 'antd/dist/antd.css'
import './assets/main.css'  //公共样式

class Main extends Component {
	render(){
		return (
			<Layout className="layout">
		    <Header style={{position: 'fixed',width:"100%"}}>
		      <img className="logo" src={require('./assets/image/logo.png')} />
		      <Menu
		      	theme="dark"
		        mode="horizontal"
		        defaultSelectedKeys={['1']}
		        style={{ lineHeight: '64px' }}
		      >
		        <Menu.Item key="1"><Link to="r">1</Link></Menu.Item>
		        <Menu.Item key="2"><Link to="h">2</Link></Menu.Item>
		        <Menu.Item key="3"><Link to="i">3</Link></Menu.Item>
		      </Menu>
		    </Header>
		    <Content style={{marginTop:64}}>
		      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>{this.props.children}</div>
		    </Content>
		    {/*<Footer style={{ textAlign: 'center' }}>
		      Scookie.github.io ©2017 Created by watermelon
		    </Footer>*/}
		  </Layout>
		)
	}
}



class RouterContainer extends Component {
	render(){
		return(
		<Router history={ hashHistory }>
	    <Route path="/" component={Main}>
	      <IndexRoute component={Resume} />
	      <Route path="r" component={Resume} />
	      <Route path="h" component={HalfwayAction} />
	      <Route path="i" component={IrregularWork} />
	    </Route>
	  </Router>
	  );
	} 
}

ReactDOM.render(<RouterContainer/>,document.getElementById("w_container"));