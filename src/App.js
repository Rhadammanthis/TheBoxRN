import React, { Component } from 'react';
import { View, StatusBar, AsyncStorage } from 'react-native';
import MySwiper from './components/MySwiper'
import Storage from 'react-native-storage';

class App extends Component {

    componentWillMount() {
        const storage = new Storage({
            size: 1000,
            storageBackend: AsyncStorage,
            defaultExpires: null,
            enableCache: true,
            sync: {
                // we'll talk about the details later.
            }
        })

        global.storage = storage;
    }

    render() {
        return (
            <View>
                <StatusBar
                    backgroundColor="#651923"
                    barStyle="light-content"
                    />
                <MySwiper />
            </View>
        );
    }
}

export default App;