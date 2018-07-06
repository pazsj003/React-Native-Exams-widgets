import { CheckBox } from 'react-native-elements';
import React, {Component} from 'react'
 export default  class CustomCheckbox extends Component {
    constructor() {
        super();

        this.state = {
            checked: false
        };
    }

    render() {
        const { tag } = this.props;
        const { checked } = this.state;

        return (
            <CheckBox
                key={tag}
                // center
                title={tag}
                // iconRight
                // iconType='material'
                // checkedIcon='dot-circle-o'
                // uncheckedIcon='circle-o'
                // checkedColor='red'
                checked={checked}
                onPress={() => this.setState({checked: !checked})}
            />
        );
    }
}


{/*<CheckBox onPress={() => this.updateForm({isTrue: !this.state.isTrue})}*/}

{/*checked={this.state.isTrue}*/}
{/*title={option}/>}*/}