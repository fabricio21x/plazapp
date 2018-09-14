import React, { Component } from 'react';
import { Animated, Alert, PanResponder } from 'react-native';
import { Container, Content } from 'native-base';
import Svg, { Polygon, Line, Circle, G, Text } from 'react-native-svg';

const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const START_OFFSET = 9;
const START_RADIUS = 10;

class DrawParkSvg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      strokeDashoffset: new Animated.Value(START_OFFSET),
      radius: new Animated.Value(START_RADIUS)
    };
  }

  componentDidMount() {
    this.addListener();
    this.animate();
    this.animateCircle();
  }
  addListener() {
    this.state.radius.addListener(radius => {
      if (this._myCircle) this._myCircle.setNativeProps({ r: radius.value.toString() });
    });
  }

  animate() {
    this.state.strokeDashoffset.setValue(START_OFFSET);
    Animated.sequence([
      Animated.timing(this.state.strokeDashoffset, {
        toValue: 0,
        duration: 500
      })
    ]).start(() => {
      this.animate();
    });
  }

  animateCircle() {
    this.state.radius.setValue(START_RADIUS);
    Animated.sequence([
      Animated.timing(this.state.radius, {
        toValue: 30,
        duration: 1500
      })
    ]).start(() => {
      this.animateCircle();
    });
  }

  renderPath(height, width, array) {
    console.log(array);
    const path = array.map((element, index) => (
      <AnimatedLine
        key={index.toString()}
        x1={element.x_coord * width}
        y1={element.y_coord * height}
        x2={array[index + 1 < array.length ? index + 1 : index].x_coord * width}
        y2={array[index + 1 < array.length ? index + 1 : index].y_coord * height}
        stroke="#267f61"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDashoffset={this.state.strokeDashoffset}
        strokeDasharray={[6, 6]}
      />
    ));
    return path;
  }

  getUniqueItems(array) {
    let flags = [],
      output = [],
      l = array.length,
      i;
    for (i = 0; i < l; i++) {
      if (flags[array[i].park_zone_id]) continue;
      flags[array[i].park_zone_id] = true;
      output.push(array[i].park_zone_id);
    }
    return output;
  }

  hexToRgbA(hex) {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = `0x${c.join('')}`;
      return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')},0.5)`;
    }
    throw new Error('Bad Hex');
  }

  calcCenter(points, width, height) {
    const n = points.length;
    let sumX = 0;
    let sumY = 0;
    const coords = [];

    for (let i = 0; i < n; i++) {
      sumX += points[i].x_coord;
      sumY += points[i].y_coord;
    }

    coords.push(((sumX * width) / n).toString());
    coords.push(((sumY * height) / n).toString());

    return coords;
  }

  renderStoreLimits(height, width, array, zones) {
    return this.getUniqueItems(array).map(item => {
      const itemPoints = array.filter(el => el.park_zone_id === item);
      const zone = zones.filter(z => z.id === item)[0];
      const color = zone.color.slice(0, 1) + zone.color.slice(3, zone.color.length);
      const center = this.calcCenter(itemPoints, width, height);
      const path = itemPoints.map(
        element => `${element.x_coord * width},${element.y_coord * height}`
      );
      return (
        <G
          onPress={() =>
            Alert.alert(
              'Informacion de la zona',
              `Libres: ${zone.occupied}\n Ocupados: ${zone.free}`
            )
          }
        >
          <Polygon points={path} fill={this.hexToRgbA(color)} stroke={color} strokeWidth="1" />
          <Text
            fill="#ffffff"
            stroke="black"
            fontSize="25"
            fontWeight="bold"
            x={center[0]}
            y={center[1]}
            textAnchor="middle"
          >
            {`${zone.description} (${zone.occupied})`}
          </Text>
        </G>
      );
    });
  }

  renderEntry(height, width, position) {
    return (
      <G>
        <AnimatedCircle
          ref={ref => (this._myCircle = ref)}
          cx={width * position.x_coord}
          cy={height * position.y_coord}
          r={START_RADIUS}
          fill="rgba(244, 86, 66, 0.5)"
        />
        <Circle cx={width * position.x_coord} cy={height * position.y_coord} r="5" fill="#f45642" />
      </G>
    );
  }

  render() {
    const {
      height,
      width,
      zoneLimits,
      zones,
      path,
      entry,
      drawStore,
      drawPath,
      drawEntry
    } = this.props;

    return (
      <Svg height={height} width={width} style={{ zIndex: 1 }}>
        {drawStore ? this.renderStoreLimits(height, width, zoneLimits, zones) : null}
        {drawPath ? this.renderPath(height, width, path) : null}
        {drawEntry ? this.renderEntry(height, width, entry) : null}
      </Svg>
    );
  }
}

export default DrawParkSvg;
