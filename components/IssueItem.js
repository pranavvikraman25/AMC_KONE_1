import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function IssueItem({ title, status = 'open' }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>• {title}</Text>
      <Text
        style={[
          styles.status,
          status === 'resolved'
            ? styles.resolved
            : styles.open,
        ]}
      >
        {status.toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  title: {
    fontSize: 13,
    color: '#333',
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
  },
  open: {
    color: '#c62828',
  },
  resolved: {
    color: '#2e7d32',
  },
});
