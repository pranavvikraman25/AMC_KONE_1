import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';

import useAccelerometer from '../hooks/useAccelerometer';
import { classifyZone } from '../utils/zoneClassifier';

/*
  Props expected:
  - elevator : string
  - floor    : number
  - onFinish : function(report)
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

  const timerRef = useRef(null);

  // 🔴 SENSOR HOOK (single source of truth)
  const {
    movementState,
    stationarySeconds,
    trajectory,
    reset,
  } = useAccelerometer(running);

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

  /* ---------- HELPERS ---------- */
  const formatTime = (totalSeconds) => {
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;
    return `${min}m ${sec}s`;
  };

  const startMaintenance = () => {
    setSeconds(0);
    reset();
    setRunning(true);
  };

  const endMaintenance = () => {
    setRunning(false);

    const inferredZone = classifyZone(trajectory);

    const report = {
      elevator,
      floor,
      faultCode: '0021',
      totalTime: seconds,
      stationaryTime: stationarySeconds,
      inferredZone,
      trajectory,
      confidence: trajectory.length > 50 ? 'High' : 'Medium',
      timestamp: new Date().toISOString(),
    };

    console.log('MAINTENANCE REPORT:', report);

    onFinish && onFinish(report);
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

      {/* STATUS CARDS */}
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

      <View style={styles.card}>
        <Text style={styles.label}>Captured Samples</Text>
        <Text style={styles.value}>{trajectory.length}</Text>
      </View>

      {/* ACTION BUTTON */}
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
