import React,{Component} from "react";

import "bootstrap";

export default class Search extends Component{
  	render() {
	    return (
	    	<div className="col-lg-6">
			    <div className="input-group">
			      <input type="text" className="form-control" placeholder="Search for..." />
			      <span className="input-group-btn">
			        <button className="btn btn-default" type="button">search</button>
			      </span>
			    </div>
			</div>
	    );
  	}
}