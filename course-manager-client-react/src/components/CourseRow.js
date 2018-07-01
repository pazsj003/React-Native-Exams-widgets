import React from 'react';
import {Link} from 'react-router-dom'
import Radium from 'radium';

class CourseRow extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (

            <div className="col-10  p-1">
               <ul  className="list-unstyled">
                <div
                    key="coursetitle"

                    style={[styles.tab]}>
                    <li style={{display:'inline'}}>
                    <Link to={`/course/${this.props.course.id}`}>
                        <div style={styles.tabContent}>{this.props.course.title}</div>
                    </Link>
                        </li>
                </div>


                <div
                    key="courseDelete"
                   >

                    <li  style={{display:'inline'}}>
                    <button

                        style={{marginTop:'20px',marginLeft:'20px',height:'45px'}}
                        className="btn btn-outline-success  "
                        onClick={() => {
                            this.props.delete(this.props.course.id)
                        }}>
                        Delete


                    </button>
                        </li>
                </div>
                   </ul>
            </div>


        )
    }
}

const styles = {
    /* Style the tab */
    tab: {
        float: 'left',
        // border: '1px solid #ccc',
        top: '20px',
        position: 'relative',
        backgroundColor: '#f1f1f1',
        width: '700px',
        height: '50px',


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
        ':link': {
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
    tabContent: {
        color: 'black',
        fontSize: '18px',
        // float: 'left',
        paddingLeft: '20px',
        paddingTop: '10px',

        // border: '1px solid #ccc',
        width: '200px',
        // borderLeft: 'none',
        height: '5px',
        verticalAlign: 'middle',
        // lineHeight:'10px',
    },

}

export default Radium(CourseRow);
