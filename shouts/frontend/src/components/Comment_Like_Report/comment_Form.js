import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import uuidv1 from "uuid";  
import { addComment } from "../Comment_Like_Report/CommentBox"    
  
class ConnectedForm extends Component{  
    constructor(){  
        super();  
        this.state = {  
            title:""  
        };  
        this.handleChange = this.handleChange.bind(this);  
        this.handleSubmit = this.handleSubmit.bind(this);  
    }  
     
    handleSubmit(event) {  
        event.preventDefault();  
        const { title } = this.state;  
        const id = uuidv1();  
        this.props.addComment({ title,id });  
        this.setState({ title: ""});  
    }  
  
    handleChange(event){  
        this.setState({  
            [event.target.id]: event.target.value  
        })  
    }  
    render(){  
        const { title } = this.state;  
     return (  
     <form onSubmit={this.handleSubmit}>  
    <div  className="form-group mt-3">  
    <label htmlFor="title"><strong>Enter your comments below</strong></label>  
    <textarea type="text" className="form-control"  id="title"  
    value={title} onChange={this.handleChange} />  
     <button type="submit" className="btn btn-success btn-lg mt-2">  
    SAVE  
    </button>  
    </div>  
     
    </form>  
        );  
    }  
} 

const mapDispatchToProps = ( dispatch ) => {  
    return {  
        addComment: comment => dispatch (addComment(comment))  
    };  
};
  
const Form = connect(null,mapDispatchToProps)(ConnectedForm);  
export default Form;