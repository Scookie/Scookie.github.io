// import React,{Component} from "react";
// import config from "./config.json";
// import styles from "./Greeter.css";

// require("./main.css")

// class Greeter extends Component{
//   render() {
//     return (
//       <div className={styles.root}>
//         {config.greetText}
//       </div>
//     );
//   }
// }

// export default Greeter;
import React, {Component} from 'react'
import config from './config.json';
import $ from 'jquery';

class Greeter extends Component{
	
  render() {
  	$.get("/misc/report/?limit=20&start=1",function(data){
		console.log(data);
	})
    return (
      <div>
        {config.greetText}
      </div>
    );
  }
}

export default Greeter;