import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import { Accelerometer } from 'expo-sensors';

/*
  Props expected:
  - onBack : function()
*/

const { width } = Dimensions.get('window');
const MAP_SIZE = width - 40;

export default function MovementHeatMapScreen({ onBack }) {
  const [points, setPoints] = useState([]);
  const accelSub = useRef(null);
  const last = useRef({ x: 0, y: 0, z: 0 });
  const cursor = useRef({ x: MAP_SIZE / 2, y: MAP_SIZE / 2 });

  useEffect(() => {
    Accelerometer.setUpdateInterval(500);

    accelSub.current = Accelerometer.addListener((data) => {
      const dx = data.x - last.current.x;
      const dy = data.y - last.current.y;
      const dz = data.z - last.current.z;

      const movement = Math.abs(dx) + Math.abs(dy) + Math.abs(dz);

      // Simulate movement inside elevator car
      if (movement > 0.05) {
        cursor.current.x += dx * 20;
        cursor.current.y += dy * 20;

        cursor.current.x = Math.max(0, Math.min(MAP_SIZE, cursor.current.x));
        cursor.current.y = Math.max(0, Math.min(MAP_SIZE, cursor.current.y));
      }

      setPoints((prev) => [
        ...prev.slice(-120),
        {
          x: cursor.current.x,
          y: cursor.current.y,
          intensity: movement < 0.08 ? 0.9 : 0.4,
        },
      ]);

      last.current = data;
    });

    return () => accelSub.current && accelSub.current.remove();
  }, []);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.back}>⬅</Text>
        </Pressable>
        <Text style={styles.title}>Movement Heat Map</Text>
      </View>

      {/* MAP AREA */}
      <View style={styles.map}>
        {points.map((p, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                left: p.x,
                top: p.y,
                opacity: p.intensity,
              },
            ]}
          />
        ))}
      </View>

      {/* LEGEND */}
      <View style={styles.legend}>
        <Text style={styles.legendText}>
          ● Dark = Stayed longer
        </Text>
        <Text style={styles.legendText}>
          ● Light = Moving
        </Text>
      </View>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 40,
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  back: {
    fontSize: 18,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0071CE',
  },

  map: {
    width: MAP_SIZE,
    height: MAP_SIZE,
    borderRadius: 12,
    backgroundColor: '#f5f7fa',
    alignSelf: 'center',
    position: 'relative',
    overflow: 'hidden',
  },

  dot: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#d32f2f',
  },

  legend: {
    marginTop: 15,
    alignItems: 'center',
  },
  legendText: {
    fontSize: 12,
    color: '#555',
  },
});
