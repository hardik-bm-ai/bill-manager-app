import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';

const NetworkComponent = () => {
  return (
    <ImageBackground style={styles.root} blurRadius={100}>
      <View style={[styles.container, styles.elevation, styles.shadowProp]}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: '#fff',
            paddingVertical: 10,
          }}>
          Network Not Available
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: '#fff',
            paddingVertical: 10,
          }}>
          Please Connect to Internet
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingTop: 100,
    backgroundColor: 'rgba(237, 243, 255, 0.7)',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    width: '75%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#5f6caf',
    paddingVertical: 50,
    borderRadius: 15,
  },
  elevation: {
    elevation: 20,
    shadowColor: 'black',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});

export default NetworkComponent;
