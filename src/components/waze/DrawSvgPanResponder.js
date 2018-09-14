import React, { Component } from 'react';
import {
    Animated
} from 'react-native';
import {
    Container,
    Content
} from 'native-base';
import Svg,{
    Circle,
    G
} from 'react-native-svg';
import {
	PanResponder,
} from 'react-native';


const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const START_OFFSET = 9;
const START_RADIUS = 10;

class DrawSvg extends Component {

    constructor(props){
        super(props);
        this.state = {
            strokeDashoffset: new Animated.Value(START_OFFSET),
            radius: new Animated.Value(START_RADIUS)
        };
    };
    addListener() {
        this.state.radius.addListener( (radius) => {
            if (this._myCircle)
                this._myCircle.setNativeProps({ r: radius.value.toString() });
        });
    }

    componentWillMount() {
      this._panResponder = PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => {
          return false;
        },
        onStartShouldSetPanResponderCapture: (evt, gestureState) => {
          var point = {
            x: evt.nativeEvent.locationX,
            y: evt.nativeEvent.locationY,
          };
          this.props.onClick(point);
          return false;
        },
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          return false;
        },
        onMoveShouldSetPanResponderCapture: (evt, gestureState) =>{
          return false;
        },
  
        onPanResponderGrant: (evt, gestureState) => {
          // The gesture has started. Show visual feedback so the user knows
          // what is happening!
  
          // gestureState.d{x,y} will be set to zero now
        },
        onPanResponderMove: (evt, gestureState) => {
          // The most recent move distance is gestureState.move{X,Y}
  
          // The accumulated gesture distance since becoming responder is
          // gestureState.d{x,y}
          return true;
        },
        onPanResponderTerminationRequest: (evt, gestureState) => {
          return true;
        },
        onPanResponderRelease: (evt, gestureState) => {
          // The user has released all touches while this view is the
          // responder. This typically means a gesture has succeeded
          return true;
        },
        onPanResponderTerminate: (evt, gestureState) => {
          // Another component has become the responder, so this gesture
          // should be cancelled
          return true;
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
          // Returns whether this component should block native components from becoming the JS
          // responder. Returns true by default. Is currently only supported on android.
          return false;
        },
      });
    }
  

    componentDidMount(){
        this.addListener();
        this.animateCircle();
    };


    renderMyPosition(height, width, position) {
        return (
            <G>
                <AnimatedCircle
                    ref={ ref => this._myCircle = ref }
                    cx={width * position.x}
                    cy={height * position.y}
                    r={START_RADIUS}
                    fill="rgba(34, 131, 241, 0.5)"
                />
                <Circle
                    cx={width * position.x}
                    cy={height * position.y}
                    r="5"
                    fill="blue"
                />                
            </G>
        );
    };

    animateCircle(){
        this.state.radius.setValue(START_RADIUS);
        Animated.sequence([
            Animated.timing(this.state.radius, {
                toValue: 30,
                duration: 1500,
            }),
          ]).start(() => {
            this.animateCircle();
          });
    };

    render(){
        const { height, width, myPosition, drawMyPosition } = this.props;
        
        return (
            <Svg
                height={height}
                width={width}
                style={{zIndex: 1}}
                {...this._panResponder.panHandlers}
            >
                { drawMyPosition ? this.renderMyPosition(height, width, myPosition) : null}
            </Svg>
        )
    }
};


export default DrawSvg;