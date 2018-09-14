import React, { Component } from 'react';
import {
    Dimensions,
    ImageBackground,
    Animated
} from 'react-native';
import {
    Container,
    Content
} from 'native-base';
import Svg,{
    Polygon,
    Line,
    Circle,
    G
} from 'react-native-svg';


const AnimatedLine = Animated.createAnimatedComponent(Line);
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

    componentDidMount(){
        this.addListener();
        this.animate();
        this.animateCircle();
    };

    renderPath(height, width, array) {
        const path = array.map((element, index)=>{
            return (
                <AnimatedLine
                    key={index.toString()}
                    x1={element.from.x * width}
                    y1={element.from.y * height}
                    x2={element.to.x * width}
                    y2={element.to.y * height}
                    stroke="#4958ff"
                    strokeWidth="3"
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeDashoffset={this.state.strokeDashoffset}
                    strokeDasharray={[6,6]}
                />
            );
        })
        return path;
    };

    renderStoreLimits(height, width, array) {
        const path = array.map(function(element) {
            return (element.x * width)  + ',' + (element.y * height) + ' ';
        });
        return (
            <Polygon
                points={path}
                fill="rgba(34, 131, 241, 0.5)"
                stroke="#1500ff"
                strokeWidth="1"
            />
        );
    };

    renderMyPosition(height, width, array, position) {
        const path = array.map(function(element) {
            return (element.x * width)  + ',' + (element.y * height) + ' ';
        });
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
                <Polygon
                    points={path}
                    fill="rgba(53, 156, 77, 0.5)"
                    stroke="#009688"
                    strokeWidth="1"
                />
            </G>
        );
    };

    animate(){
        this.state.strokeDashoffset.setValue(START_OFFSET);
        Animated.sequence([
            Animated.timing(this.state.strokeDashoffset, {
                toValue: 0,
                duration: 500,
            }),
          ]).start(() => {
            this.animate();
          });
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
        const { height, width, storeLimits, myPositionLimits, path, myPosition, drawStore, drawPath, drawMyPosition } = this.props;
        
        return (
            <Svg
                height={height}
                width={width}
                style={{zIndex: 1}}
            >
                { drawStore ? this.renderStoreLimits(height, width, storeLimits) : null}
                { drawPath ? this.renderPath(height, width, path) : null}
                { drawMyPosition ? this.renderMyPosition(height, width, myPositionLimits, myPosition) : null}
            </Svg>
        )
    }
};


export default DrawSvg;