import React, {Component} from 'react';
import {ImageBackground, Text, View, Image, Animated, Alert, TouchableOpacity, Easing, StyleSheet} from 'react-native';
import {em, W, H} from '../config/uivar'
var Sound = require('react-native-sound');

const storyArray = [
    {title: 'The Flying Coins', cover_image: 'story_cover_1.png', full_image: 'story_full.png'},
    {title: 'The brave pea', cover_image: 'story_cover_2.png', full_image: 'story_full.png'},
    {title: 'The Vacuum Cat', cover_image: 'story_cover_3.png', full_image: 'story_full.png'},
    {title: 'vliegende munten', cover_image: 'story_cover_1.png', full_image: 'story_full.png'},
    {title: 'dappere erwt', cover_image: 'story_cover_2.png', full_image: 'story_full.png'},
    {title: 'zingende zwaard', cover_image: 'story_cover_3.png', full_image: 'story_full.png'}
];
const img_pause = require('../images/ui_pause.png');
const img_play = require('../images/ui_play.png');
const exit_story = require('../images/exit_story.png');
const ANIMATION_DURATION = 10000;

const textArray = [
    {duration:5000, text: 'Once upon a time, not very long ago, in a place, not very far from here'},
    {duration:7000, text: 'Little Louis was tucked in by his mother. ‘Good night’ she said, “sleep tight, and have'},
    {duration:2000, text: 'sweet dreams'}
];

const styles = StyleSheet.create({
    text: {fontSize: 30*em}
});

export default class StoryScreen extends Component {
    static navigationOptions = {
        headerStyle: {
            display: 'none'
        }
    };
    state = {
        leftValue : 0,
        playState : 'paused',
        playSeconds:0,
        duration:0,
        lineNumber: 0,
        textWidth: 0,
    };
    handleScrollRef = ref => this.scroll = ref;
    constructor(props){
        super(props);
        this.backgroundImage = require('../1/s1-image.png');
        this.backgroundImageWidth = Image.resolveAssetSource(this.backgroundImage).width;
        this.backgroundImageHeight = Image.resolveAssetSource(this.backgroundImage).height;
        this.barImage = require('../images/story_bar.png');
        this.textContainerWidth = 0;
        this.bgWidth = -this.backgroundImageWidth / this.backgroundImageHeight * H + W;
        this.leftValue = new Animated.Value(0);
        this.leftValue.addListener(({value}) => this.bgPos = value);
        Animated.timing(
            this.leftValue,
            {
                toValue: this.bgWidth,
                duration: ANIMATION_DURATION
            }
        ).start();

        this.animateText();
    }

    componentDidMount() {
        this.play();
    }

    componentWillUnmount(){
        if(this.sound){
            this.sound.release();
            this.sound = null;
        }
        if(this.timeout){
            clearInterval(this.timeout);
        }
    }

    play = async () => {
        if(this.sound){
            this.sound.play(this.playComplete);
            this.setState({playState:'playing'});

            this.leftValue = new Animated.Value(this.bgPos);
            Animated.timing(
                this.leftValue,
                {
                    toValue: this.bgWidth,
                    duration: ANIMATION_DURATION * ( this.bgWidth - this.bgPos) / this.bgWidth,
                    easing: Easing.ease
                }
            ).start();

            this.leftValue.addListener(({value}) => this.bgPos = value);

            this.leftScrollView = new Animated.Value(this.textPos);
            this.leftScrollView.addListener(({value}) => this.textPos = value);
            Animated.timing(
                this.leftScrollView,
                {
                    toValue: 1,
                    duration: textArray[this.state.lineNumber].duration * (1 - this.textPos),
                    easing: Easing.ease
                }
            ).start(() => {
                if(this.state.lineNumber < textArray.length - 1 && this.textPos === 1){
                    this.setState({lineNumber: this.state.lineNumber + 1});
                    this.animateText();
                }
            });
        }else{
            const filepath = "s1-ambient-music.mp3";

            this.sound = new Sound(filepath, Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    Alert.alert('Notice', 'audio file error. (Error code : 1)');
                    this.setState({playState:'paused'});
                }else{
                    this.setState({playState:'playing', duration:this.sound.getDuration()});
                    this.sound.play(this.playComplete);
                }
            });
        }
    };

    pause = () => {
        if(this.sound){
            this.sound.pause();
        }
        // this.leftValue.stopAnimation((pos)=> {
        //     this.bgPos = pos;
        // });
        Animated.timing(this.leftValue).stop();
        this.leftScrollView.stopAnimation((pos)=> {
            this.textPos = pos;
        });
        this.setState({playState:'paused'});
    };

    animateText = () => {
        this.leftScrollView = new Animated.Value(0);
        this.leftScrollView.addListener(({value}) => this.textPos = value);
        Animated.timing(
            this.leftScrollView,
            {
                // toValue: this.textContainerWidth - width,
                toValue: 1,
                duration: textArray[this.state.lineNumber].duration,
                easing: Easing.ease
            }
        ).start(() => {
            if(this.state.lineNumber < textArray.length - 1 && this.textPos === 1){
                this.setState({lineNumber: this.state.lineNumber + 1});
                this.animateText();
            }
        });
    };

    isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
    };

    exitStory = () => {
        // this.leftValue.stopAnimation();
        // this.leftScrollView.stopAnimation();
        if(this.sound){
            this.sound.release();
            this.sound = null;
        }
        if(this.timeout){
            clearInterval(this.timeout);
        }
        this.props.navigation.navigate('overview');
    };

    render() {
        const leftText = this.leftScrollView.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 500*em - this.state.textWidth]
        });
        return (
            <View style={{flex:1}}>
                {/*<Animated.Image*/}
                {/*    style={{*/}
                {/*        position: 'absolute',*/}
                {/*        left: this.leftValue,*/}
                {/*        height: H,*/}
                {/*        width: this.backgroundImageWidth / this.backgroundImageHeight * H*/}
                {/*    }}*/}
                {/*    resizeMode="stretch"*/}
                {/*    source={this.backgroundImage}*/}
                {/*/>*/}
                <ImageBackground style={{position:'absolute', bottom: 70*em, display:'flex', justifyContent: 'center', paddingLeft: 0*em, paddingRight: 30*em,
                    width: W, height: 200*em}} resizeMode="stretch" source={this.barImage}>
                    <View style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View onLayout={(evt)=>{
                            const {width} = evt.nativeEvent.layout;
                            this.textContainerWidth = width;
                        }}>
                            <Animated.Text style={[styles.text
                                ,{position:'absolute', left: leftText}
                                ]} onLayout={(evt)=>{
                                const {width} = evt.nativeEvent.layout;
                                this.setState({textWidth :width});
                            }}>{textArray[this.state.lineNumber].text}</Animated.Text>
                        </View>
                        <View style={{display:'flex', flexDirection: 'row'}}>
                            {this.state.playState === 'playing' &&
                            <TouchableOpacity onPress={this.pause}>
                                <Image source={img_pause} style={{width:100*em, height:100*em}}/>
                            </TouchableOpacity>}
                            {this.state.playState === 'paused' &&
                            <TouchableOpacity onPress={this.play}>
                                <Image source={img_play} style={{width:100*em, height:100*em}}/>
                            </TouchableOpacity>}
                            <TouchableOpacity onPress={this.exitStory.bind(this)}>
                                <Image source={exit_story} style={{width:100*em, height:100*em}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}
