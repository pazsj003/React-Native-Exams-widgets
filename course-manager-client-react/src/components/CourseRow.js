import React from 'react';
import {Link} from 'react-router-dom'
import Radium from 'radium';

class CourseRow extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (

            <tr className="col-10">
                <td>
                    <div style={[styles.tab]}>
                        <Link to={`/course/${this.props.course.id}`}>
                            <div style={styles.tabContent}>{this.props.course.title}</div>
                        </Link>
                    </div>

                </td>


                <td>
                    <button className="btn btn-outline-success my-2 my-sm-0"
                            onClick={() => {
                                this.props.delete(this.props.course.id)
                            }}>
                        Delete


                    </button>
                </td>
            </tr>


        )
    }
}

const styles = {
    /* Style the tab */
    tab: {
        float: 'left',
        // border: '1px solid #ccc',
        // paddingRight: '100px',
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
        fontSize: '15px',
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

export default Radium(CourseRow);
