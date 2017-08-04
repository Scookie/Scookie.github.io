import React,{Component} from "react";

import Search from "../../components/search/Search";
import HomeList from "../../components/list/HomeList";

import "bootstrap";

class Index extends Component{
  	render() {
	    return (
	    	<div className="main-content col-lg-4 col-md-6">
	    		<Search />
	    		<HomeList />
			</div>
	    );
  	}
}

export default Index;