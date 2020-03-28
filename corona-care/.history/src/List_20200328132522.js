import React, { Component } from "react";

class List extends Component {
    constructor(){
        super()
        this.setState({
            requests: []
        })
    }

    componentDidMount(){
        fetch('http://localhost:3000/requests' , {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accepts: "application/json",
              Authorization: `Bearer ${localStorage.token}`
            }})
            .then()
    }
        
    
    
    
    
    
    
    
    .then(response => response.json())
        // .then(this.setState({...this.state})
        
}

