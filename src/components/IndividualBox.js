import React,{ Component } from 'react';
import { View, Text, AsyncStorage, ListView, ActivityIndicator, Platform, StyleSheet } from 'react-native';
import WeekRowUnChecked from './WeekRowUnChecked';
import WeekRowChecked from './WeekRowChecked';

class IndividualBox extends Component {

    state = { weeks: [] }

    componentWillMount(){
        const weeks = [];

        for(var i = 1; i < 49; i++){

            weeks.push({id: this.props.name+i, text: `Semana ${i} - $${i*15}`});

        //This populates the local storage with the necessary data
            // global.storage.save({
            //     key: this.props.name+i,
            //     rawData: { 
            //         payed: false 
            //     }
            // });

        } 

        weeks.forEach( (week, index) => {
            global.storage.load({
                key: week.id
            }).then(ret => {

                week.checked = ret.payed;

                if(index === 47){
                    this.createDataSource(weeks);
                    this.setState({ weeks: weeks });
                }

            }).catch(err => {
                console.warn(err.message);
                switch (err.name) {
                    case 'NotFoundError':
                        // TODO;
                        break;
                    case 'ExpiredError':
                        // TODO
                        break;
                }
            });
        });
        

        this.createDataSource(weeks);
    }

    createDataSource(weeks){
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(weeks);
    }

    renderRow(week){
        if(week.checked)
            return <WeekRowChecked week={week} />;
        else
            return <WeekRowUnChecked week={week} />;
    }

    renderList(){
        if(this.state.weeks.length > 0){
            return(
                <ListView
                    initialListSize={11}
                    pageSize={11} 
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
            );
        }

        return(
            <View style={styles.spinnerStyle}>
                <ActivityIndicator size={'large'} color={'#5e2129'}/>
            </View>
        )
    }

    renderOffset(){
        if(Platform.OS === 'android')
            return (<View style={{ paddingBottom: 30 }} />);

        return;
    }

    render() {
        const { headerStyle, textStyle } = styles;

        // const smartStyles = StyleSheet.create({
        //     headerStyle:{
        //         backgroundColor: '#651923',
        //         flexDirection: 'column',
        //         justifyContent: 'center',
        //         shadowColor: '#000',
        //         shadowOffset: { width: 0, height: 2 },
        //         shadowOpacity: 0.2,
        //         elevation: 2,
        //         position: 'relative',
        //         height: (Platform.OS === 'ios') ? 120 : 60,
        //     }
        // });
            
        return(
            <View>
                <View style={headerStyle}>
                    <Text style={textStyle}>{this.props.name}</Text>
                </View>
                {this.renderList()}
                {this.renderOffset()}
            </View>
        );
    }

}

const styles = {
    headerStyle: {
        backgroundColor: '#651923',
        flexDirection: 'column',
        justifyContent: 'center',
        height: (Platform.OS === 'ios') ? 80 : 60,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        paddingLeft: 15,
        fontSize: 20,
        paddingTop: (Platform.OS === 'ios') ? 10 : 0, 
    },
    spinnerStyle: {
        flex: 1,
        paddingTop: 250,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export default IndividualBox;