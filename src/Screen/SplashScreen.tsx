import React, { useEffect, useRef } from 'react';
import { View, StatusBar, StyleSheet, Animated, Easing } from 'react-native';

export default function SplashScreen() {
  const imageUrl = 'https://i.imgur.com/UvoPa2i.png';

  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 2,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {});
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <Animated.Image
        source={{ uri: imageUrl }}
        style={{ ...styles.image, transform: [{ scale: scaleValue }] }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
});
