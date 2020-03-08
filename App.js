import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';



const App = () => {

  let [hasPermission, setPermission] = useState(null)
  let [type, setType] = useState(Camera.Constants.Type.back)
  let cameraRef = useRef(null)

  useEffect(() => {
    getPermissionAsync()
  }, []);

  getPermissionAsync = async () => {
    // Camera roll Permission 
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setPermission(status === 'granted');
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
  }

  takePicture = async () => {
    if (cameraRef) {
      let photo = await cameraRef.current.takePictureAsync();
    }
  }

  handleCameraType = () => {
    const cameraType = type;
    const newType = (cameraType === Camera.Constants.Type.back)
      ? Camera.Constants.Type.front
      : Camera.Constants.Type.back
    setType(newType);

  }

  if (hasPermission === null) {
    return <View />;
  } else if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} type={type}
          ref={cameraRef}
          >
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", margin: 20 }}>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}
              onPress={() => pickImage()}
            >
              <Ionicons
                name="ios-photos"
                style={{ color: "green", fontSize: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}>
              <FontAwesome
                name="camera"
                style={{ color: "red", fontSize: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}
              onPress={() => handleCameraType()}
            >
              <MaterialCommunityIcons
                name="camera-switch"
                style={{ color: "blue", fontSize: 40 }}
              />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
