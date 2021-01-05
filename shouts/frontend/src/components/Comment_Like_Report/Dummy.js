import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import  {fetchComments}  from '../../actions/comment_action';

const Dummy = () => {

    
    
    //----- redux and dispatch the action
    const comments = useSelector((state) => state.Comment);

    const dispatch = useDispatch();
    const getComments = () => dispatch(fetchComments());


    useEffect(()=>{
        getComments();
       }, [])

    // console.log("from comp cities"+ cities.allcities);
    // console.log("Form component news"+JSON.stringify(techSelector.allNews));
    
    console.log(comments);
    

    return(
        
        <div>


{
        comments.map(c=>(
            <p>{c.comment}</p>
        ))

}
            {/* <ul className="list-group list-group-flush">  
    {  
     console.log(comments),
        comments.map( el => (  
            <li className="list-group-item" key={el.id}>  
            { el.title }  
            </li>  
        ))  
    }  
    </ul>   */}
        </div>
        
    )   
}

export default Dummy;