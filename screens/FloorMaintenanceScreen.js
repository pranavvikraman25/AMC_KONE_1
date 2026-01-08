import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Accelerometer } from 'expo-sensors';

/*
  Props expected:
  - elevator : string
  - floor    : number
  - onFinish : function()
  - onBack   : function()
*/

export default function FloorMaintenanceScreen({
  elevator,
  floor,
  onFinish,
  onBack,
}) {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [stationarySeconds, setStationarySeconds] = useState(0);
  const [movementState, setMovementState] = useState('Idle');

  const timerRef = useRef(null);
  const accelRef = useRef(null);
  const lastAccel = useRef({ x: 0, y: 0, z: 0 });

  /* ---------- TIMER ---------- */
  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [running]);

  /* ---------- ACCELEROMETER ---------- */
  useEffect(() => {
    if (!running) return;

    Accelerometer.setUpdateInterval(500);

    accelRef.current = Accelerometer.addListener((data) => {
      const diff =
        Math.abs(data.x - lastAccel.current.x) +
        Math.abs(data.y - lastAccel.current.y) +
        Math.abs(data.z - lastAccel.current.z);

      if (diff < 0.08) {
        setMovementState('Stationary');
        setStationarySeconds((prev) => prev + 1);
      } else {
        setMovementState('Moving');
      }

      lastAccel.current = data;
    });

    return () => accelRef.current && accelRef.current.remove();
  }, [running]);

  /* ---------- HELPERS ---------- */
  const formatTime = (totalSeconds) => {
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;
    return `${min}m ${sec}s`;
  };

  const startMaintenance = () => {
    setSeconds(0);
    setStationarySeconds(0);
    setRunning(true);
  };

  const endMaintenance = () => {
    setRunning(false);
    onFinish && onFinish({
      elevator,
      floor,
      totalTime: seconds,
      stationaryTime: stationarySeconds,
    });
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.back}>⬅</Text>
        </Pressable>
        <Text style={styles.headerTitle}>
          {elevator} – Floor {floor}
        </Text>
      </View>

      {/* STATUS */}
      <View style={styles.card}>
        <Text style={styles.label}>Total Time</Text>
        <Text style={styles.value}>{formatTime(seconds)}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Stationary Time</Text>
        <Text style={styles.value}>
          {formatTime(stationarySeconds)}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Movement Status</Text>
        <Text
          style={[
            styles.value,
            movementState === 'Stationary'
              ? styles.stationary
              : styles.moving,
          ]}
        >
          {movementState}
        </Text>
      </View>

      {/* ACTION BUTTONS */}
      {!running ? (
        <Pressable
          style={[styles.button, styles.startBtn]}
          onPress={startMaintenance}
        >
          <Text style={styles.buttonText}>Start Maintenance</Text>
        </Pressable>
      ) : (
        <Pressable
          style={[styles.button, styles.endBtn]}
          onPress={endMaintenance}
        >
          <Text style={styles.buttonText}>End Maintenance</Text>
        </Pressable>
      )}
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
    marginBottom: 20,
  },
  back: {
    fontSize: 18,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0071CE',
  },

  card: {
    backgroundColor: '#f5f7fa',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: '#666',
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 4,
  },

  stationary: {
    color: '#2e7d32',
  },
  moving: {
    color: '#c62828',
  },

  button: {
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  startBtn: {
    backgroundColor: '#0071CE',
  },
  endBtn: {
    backgroundColor: '#c62828',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});
