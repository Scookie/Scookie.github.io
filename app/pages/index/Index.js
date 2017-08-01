import React,{Component} from "react";

import Search from "../../components/search/Search";

import "bootstrap";

class Index extends Component{
  	render() {
	    return (
	    	<div className="main-content col-lg-4 col-md-6">
	    		<Search />
			</div>
	    );
  	}
}

export default Index;