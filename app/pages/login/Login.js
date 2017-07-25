import React,{Component} from "react";
import config from "../../json/config.json";
import styles from "./Login.css";

require('bootstrap')

class Login extends Component{
  render() {
    return (
    <div className="col-m-12">
		<div className={styles.login_content,styles.main_content}>
			<div className={styles.login_image}>
				<span className={styles.icon_bicycle}></span>
				<div className={styles.login_logo_word}>weekend</div>
			</div>
			<div className="login-form">
				<div className="login-name">
					<span className="icon-user login-icon"></span>
					<input type="text" className="login-input login-name-input" placeholder="Email address" />
				</div>
				<div className="login-pwd">
					<span className="icon-lock login-icon"></span>
					<input type="text" className="login-input" placeholder="Password" />
				</div>
			</div>
			<button type="button" className="login-submit">Login</button>
			<div className="login-join">Create an Account</div>
			<div className="login-split">社交账号登录</div>
			<div className="login-link">
				<span className="icon-wechat login-link-icon"></span>
				<span className="icon-weibo login-link-icon"></span>
				<span className="icon-github login-link-icon"></span>
			</div>
		</div>
	</div>
    );
  }
}

export default Login;