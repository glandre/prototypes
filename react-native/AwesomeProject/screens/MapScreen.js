import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import { MapView } from 'expo'

const { Circle, Polygon, Polyline } = MapView

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825; // center of the screen
const LONGITUDE = -122.4324; // center of the screen
const LATITUDE_DELTA = 0.0922; // delta_y
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO; // delta_x
const SPACE = 0.01;

const firstCircle = {
  center: {
    latitude: LATITUDE + SPACE, // 37.78825 + 0.01
    longitude: LONGITUDE + SPACE,
  },
  radius: 70000,
}

const center = {
  center: {
    latitude: LATITUDE, // 37.78825 + 0.01
    longitude: LONGITUDE, // + SPACE,
  },
  radius: 70000,
}

const stringify = (obj) => JSON.stringify(obj, null, 2)

const getCircle = (locationX, locationY, radius = 70000) => {
  const circle = {
    center: {
      latitude: LATITUDE + locationY * LATITUDE_DELTA, // Y?
      longitude: LONGITUDE - locationX * LONGITUDE_DELTA // X?
    },
    radius
  }
  console.log(`x: ${locationX}, y: ${locationY}, r: ${radius}\ncircle: ${stringify(circle)}`)
  return circle
}

const getLatLonFromPoint = (locationX, locationY, radius = 70000) => {
  // const center = {
  //   locationX: width / 2,
  //   locationY: height / 2
  // }

  const res = ASPECT_RATIO

  const delta_x = locationX - (width / 2)
  const delta_y = locationY - (height / 2)
  console.log(`\n\n\ndelta_y: ${delta_y}, delta_x: ${delta_x}`)

  const circle = {
    center: {
      latitude: LATITUDE - delta_y * LATITUDE_DELTA,
      longitude: LONGITUDE + delta_x * LONGITUDE_DELTA,
    },
    radius
  }
  console.log(`x: ${locationX}, y: ${locationY}, r: ${radius}\ncircle: ${stringify(circle)}\n\n\n`)
  return circle
}

// console.log(`First Circle: ${stringify(firstCircle)}`)
console.log(`------------------------------------\nLATITUDE: ${LATITUDE}`)
console.log(`LATITUDE_DELTA: ${LATITUDE_DELTA}`)
console.log(`LONGITUDE: ${LONGITUDE}`)
console.log(`LONGITUDE_DELTA: ${LONGITUDE_DELTA}\n------------------------------------`)

export class MapScreen extends React.Component {
  state = {
    showOverlay: true,
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    circles: [], //[center, firstCircle],
    polygon: [
      {
        latitude: LATITUDE + SPACE,
        longitude: LONGITUDE + SPACE,
      },
      {
        latitude: LATITUDE - SPACE,
        longitude: LONGITUDE - SPACE,
      },
      {
        latitude: LATITUDE - SPACE,
        longitude: LONGITUDE + SPACE,
      },
    ],
    polyline: [
      {
        latitude: LATITUDE + SPACE,
        longitude: LONGITUDE - SPACE,
      },
      {
        latitude: LATITUDE - (2 * SPACE),
        longitude: LONGITUDE + (2 * SPACE),
      },
      {
        latitude: LATITUDE - SPACE,
        longitude: LONGITUDE - SPACE,
      },
      {
        latitude: LATITUDE - (2 * SPACE),
        longitude: LONGITUDE - SPACE,
      },
    ],
  };

  render() {
    const { region, circles, polygon, polyline } = this.state;
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={region}
        >
          {circles.map((circle, index) => (
            <Circle
              key={index}
              center={circle.center}
              radius={circle.radius}
              fillColor="red" //"rgba(255, 255, 255, 1)"
              strokeColor="rgba(0,0,0,0.5)"
              zIndex={2}
              strokeWidth={2}
            />
          ))}
          <Polygon
            coordinates={polygon}
            fillColor="rgba(0, 200, 0, 0.5)"
            strokeColor="rgba(0,0,0,0.5)"
            strokeWidth={2}
          />
          <Polyline
            coordinates={polyline}
            strokeColor="rgba(0,0,200,0.5)"
            strokeWidth={3}
            lineDashPattern={[5, 2, 3, 2]}
          />
        </MapView> 
        {this.state.showOverlay ?
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: width,
            height: height,
            backgroundColor: 'rgba(66, 134, 244, 0.5)'
          }}
          onTouchStart={(evt) => this.handleTouch('On touch start', evt)}
          // onTouchMove={(evt) => this.handleTouchMove('On touch move', evt)}
          onTouchEnd={this.handleTouchEnd} //(evt) => this.handleTouch('On touch end', evt)}
          onTouchCancel={(evt) => this.handleTouch('On touch cancel', evt)}
          onTouchEndCapture={(evt) => this.handleTouch('On touch end capture', evt)}
        /> : null}
        <View style={styles.buttonContainer} onTouchEnd={() => {
          console.log(`Toggle Overlay! current: ${this.state.showOverlay}`)
          this.setState({ showOverlay: !this.state.showOverlay})
        }}>
          <View style={styles.bubble}>
            <Text>Render circles, polygons, and polylines</Text>
          </View>
        </View>
      </View>
    )
  }

  handleTouchEnd = (evt) => {
    const { locationX, locationY } = evt.nativeEvent
    // const circle = getCircle(locationX, locationY) //getLatLonFromPoint
    const circle = getLatLonFromPoint(locationX, locationY) //getLatLonFromPoint
    this.setState({ circles: this.state.circles.concat(circle) })
  }

  handleTouch = (message, evt) => {
    // https://stackoverflow.com/questions/9382167/serializing-object-that-contains-cyclic-object-value#9382383
    // obj = evt.nativeEvent
    // const seen = []
    // const message = JSON.stringify(obj, function(key, val) {
    //   if (val != null && typeof val == "object") {
    //        if (seen.indexOf(val) >= 0) {
    //            return;
    //        }
    //        seen.push(val);
    //    }
    //    return val;
    // }, 2);
    const {locationX, locationY} = evt.nativeEvent
    console.log(`${message}:\t(${locationX},${locationY})`)
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});