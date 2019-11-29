import React, {Component} from 'react';
import {ImageBackground, Button, Text} from 'react-native';

export default class LoadScreen extends React.Component {
    static navigationOptions = {
        headerStyle: {
            display: 'none'
        }
    };
    componentDidMount() {
        setTimeout(this.goToOverView.bind(this), 2000);
    }

    goToOverView(){
        this.props.navigation.navigate('overview');
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <ImageBackground source={require('../images/load_screen.png')}
                             style={{
                               width: '100%', height: '100%',
                             }}>
            </ImageBackground>

        );
    }
}
