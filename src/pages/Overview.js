import React, {Component} from 'react';
import {ImageBackground, Text, View, Image, TouchableOpacity} from 'react-native';
import {em} from '../config/uivar'

const storyArray = [
    {title: 'The Flying Coins', cover_image: require('../images/story_cover_1.png'), full_image: require('../images/story_full.png')},
    {title: 'The brave pea', cover_image: require('../images/story_cover_2.png'), full_image: require('../images/story_full.png')},
    {title: 'The Vacuum Cat', cover_image: require('../images/story_cover_3.png'), full_image: require('../images/story_full.png')},
    {title: 'vliegende munten', cover_image: require('../images/story_cover_1.png'), full_image: require('../images/story_full.png')},
    {title: 'dappere erwt', cover_image: require('../images/story_cover_2.png'), full_image: require('../images/story_full.png')},
    {title: 'zingende zwaard', cover_image: require('../images/story_cover_3.png'), full_image: require('../images/story_full.png')}
];

export default class OverViewScreen extends Component {
    static navigationOptions = {
        headerStyle: {
            display: 'none'
        }
    };

    goToStory (index) {
        this.props.navigation.navigate('story');
    };
    render() {
        return (
            <ImageBackground source={require('../images/overview_bg.png')}
                 style={{
                   width: '100%', height: '100%'
            }}>
                <ImageBackground source={require('../images/overview_title.png')}
                    style={{
                     width: 400*em, height: 100*em, marginTop: 200*em,alignSelf:'center', paddingTop: 10*em
                    }}>
                        <Text style={{fontSize:45*em, color: 'rgb(244,116,3)', textAlign: 'center'}}>STORY</Text>
                </ImageBackground>
                <View style={{display: 'flex', flexWrap: 'wrap', flexDirection:'row'}}>
                    {storyArray.map((item, index)=>(
                        <View style={{width: 240*em, height: 240*em, justifyContent:'center', alignItems:'center'}} key={index}>
                            <TouchableOpacity style={{ width: 215*em, height: 208*em }} onPress={this.goToStory.bind(this, index)}>
                                <ImageBackground source={item.full_image} style={{ width: '100%', height: '100%' }}>
                                    <View style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}}>
                                        <Image source={item.cover_image }
                                             style={{
                                                 width: 50*em, height: 80*em, resizeMode: 'contain'
                                             }}/>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                            <ImageBackground source={require('../images/story_banner.png')}
                                   style={{
                                       width: 200*em, height: 53*em, position: 'absolute', bottom:40*em, paddingTop:25*em
                                   }}>
                                <Text style={{fontSize:15*em, color: 'black', textAlign: 'center'}}>{item.title}</Text>
                            </ImageBackground>
                        </View>
                    ))}
                </View>
            </ImageBackground>
        );
    }
}
