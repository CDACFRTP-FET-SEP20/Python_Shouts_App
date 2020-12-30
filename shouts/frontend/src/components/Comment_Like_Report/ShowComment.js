import React from 'react';  
import List from '../Comment_Like_Report/List';  
import Form from '../Comment_Like_Report/comment_Form';  
const App = () => (  
        <div className="row-mt-4">  
        <div className="col-md-4 offset-md-1">  
        <h1> Comments </h1>  
        <List />  
        <Form />  
        </div>  
        </div>  
);  
  
export default App;