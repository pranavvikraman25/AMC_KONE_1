import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function SplashScreen({ onFinish }) {
  const [visibleCount, setVisibleCount] = useState(0);

  const animations = [
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ];

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index < animations.length) {
        Animated.timing(animations[index], {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();

        setVisibleCount(index + 1);
        index++;
      } else {
        clearInterval(interval);

        // Wait a bit and move to next screen
        setTimeout(() => {
          onFinish && onFinish();
        }, 700);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const letters = ['K', 'O', 'N', 'E'];

  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        {letters.map((letter, index) => (
          <Animated.View
            key={index}
            style={[
              styles.letterBox,
              {
                opacity: animations[index],
                transform: [
                  {
                    scale: animations[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.6, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.letter}>{letter}</Text>
          </Animated.View>
        ))}
      </View>

      <Text style={styles.subtitle}>Smart Maintenance Tracking</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0071CE', // KONE blue
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  letterBox: {
    width: 60,
    height: 60,
    backgroundColor: '#ffffff',
    marginHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  letter: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0071CE',
  },
  subtitle: {
    marginTop: 10,
    color: '#ffffff',
    fontSize: 14,
    opacity: 0.9,
  },
});
