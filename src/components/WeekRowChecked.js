import React, { Component } from 'react'
import { TouchableNativeFeedback, View } from 'react-native';
import CheckBox from 'react-native-check-box';

class WeekRowChecked extends Component {

    state = { checked: true }

    onRowClicked() {
        global.storage.save({
            key: this.props.week.id,
            rawData: {
                payed: !this.state.checked
            }
        });

        console.log(`Row now is ${!this.state.checked} with id:${this.props.week.id}`);

        this.setState({ checked: !this.state.checked});
    }

    render() {

        const { rowStyle, leftTextStyle, separatorStyle } = styles;

        return (
            <View style={rowStyle}>
                <CheckBox
                    style={{ flex: 1, padding: 10 }}
                    leftTextStyle={leftTextStyle}
                    onClick={this.onRowClicked.bind(this)}
                    isChecked={this.state.checked}
                    leftText={this.props.week.text}
                    />
                <View style={{ height: 2, backgroundColor: '#e5e5e5' }} />
            </View>
        );
    }
}

const styles = {
    rowStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    leftTextStyle: {
        flex: 1,
        alignSelf: 'center',
        fontSize: 17
    },
    separatorStyle: {
        height: 70,
        flex: 1,
        backgroundColor: '#BDBDBD'
    }
}

export default WeekRowChecked