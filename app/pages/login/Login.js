import React,{Component} from "react";
import config from "../../json/config.json";
// import styles from "./Login.css";

import "./Login.css";

class Login extends Component{
	login() {
		let name=this.refs.ref_name.value;
		let pwd=this.refs.ref_pwd.value;
		if(name == "root" && pwd == "123456"){
			console.log("successful!");
		}else{
			console.log("failed!");
		}
	}
  	render() {
	    return (
	    	<div className="login-content main-content col-lg-4 col-md-6">
				<div className="login-image">
					<span className="fa fa-bicycle"></span>
					<div className="login-logo-word">weekend</div>
				</div>
				<div className="login-form">
					<div className="login-name">
						<span className="icon-user login-icon"></span>
						<input type="text" className="login-input login-name-input" placeholder="Email address" ref="ref_name" />
					</div>
					<div className="login-pwd">
						<span className="icon-lock login-icon"></span>
						<input type="password" className="login-input" placeholder="Password" ref="ref_pwd" />
					</div>
				</div>
				<button type="button" className="login-submit" onClick={this.login.bind(this)}>Login</button>
				<div className="login-join">Create an Account</div>
				<div className="login-split">社交账号登录</div>
				<div className="login-link">
					<span className="fa fa-wechat login-link-icon"></span>
					<span className="fa fa-weibo login-link-icon"></span>
					<span className="fa fa-github login-link-icon"></span>
				</div>
			</div>
	    );
  	}
}

export default Login;