import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

/*
  Props:
  - id        : string (ELV-001)
  - location  : string
  - onPress   : function
*/

export default function ElevatorCard({ id, location, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.id}>{id}</Text>
      <Text style={styles.location}>{location}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f7fa',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  id: {
    fontSize: 16,
    fontWeight: '600',
  },
  location: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
});
