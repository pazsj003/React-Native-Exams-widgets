import React from 'react';

import {Link,Route} from 'react-router-dom'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import ModuleEditor from "../containers/ModuleEditor";
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import Radium from 'radium';
 class TopicListItem
    extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div >




                    <div style={[styles.tab]}>

                            {this.props.topic.title}

                    </div>



                <span  className="float-right">
                <i className="fa fa-remove" onClick={() => {
                    this.props.delete
                    (this.props.topic.id)
                }}/>

                  </span>





            </div>
        );
    }
}
const styles = {
    /* Style the tab */
    tab : {
        float: 'left',
        // border: '1px solid #ccc',
        // paddingRight: '100px',
        position: 'relative',
        backgroundColor: 'white',
        width: '200px',
        height: '30px',


        /* Style the buttons inside the tab */
        ':button': {
            display: 'block',
            backgroundColor: 'inherit',
            color: 'black',
            padding: '0px 10px',
            // width: '100%',
            // border: 'none',
            // outline: 'none',
            textAlign: 'left',
            cursor: 'pointer',
            transition: ' 0.3s',
            fontSize: '17px',
        },

        /* Change background color of buttons on hover */
        ':hover': {
            backgroundColor: '#ddd',
        },

        /* Create an active/current "tab button" class */
        ':active': {
            backgroundColor: '#ccc',
        },
        ':link':{
            display: 'block',
            backgroundColor: 'inherit',
            color: 'black',
            padding: '0px 10px',
            // width: '100%',
            // border: 'none',
            // outline: 'none',
            textAlign: 'left',
            cursor: 'pointer',
            transition: ' 0.3s',
            fontSize: '17px',
        }

    },
    /* Style the tab content */
    tabContent :{
        color: 'black',
        fontSize:'15px',
        // float: 'left',
        paddingLeft: '20px',


        // border: '1px solid #ccc',
        width: '200px',
        // borderLeft: 'none',
        height: '5px',
        verticalAlign: 'middle',
        // lineHeight:'10px',
    },

}
export default Radium(TopicListItem);