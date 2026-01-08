import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

/*
  Props:
  - onKMP
  - onMap
  - onAdd
  - onIssues
  - onReports
*/

export default function BottomNav({
  onKMP,
  onMap,
  onAdd,
  onIssues,
  onReports,
}) {
  return (
    <View style={styles.container}>
      <NavButton label="KMP" onPress={onKMP} />
      <NavButton label="Map" onPress={onMap} />

      <Pressable style={styles.addBtn} onPress={onAdd}>
        <Text style={styles.addText}>+</Text>
      </Pressable>

      <NavButton label="Issues" onPress={onIssues} />
      <NavButton label="Reports" onPress={onReports} />
    </View>
  );
}

function NavButton({ label, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.navBtn}>
      <Text style={styles.navText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 12,            // 👈 lifts above system buttons
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    elevation: 8,          // 👈 Android shadow
    zIndex: 100,           // 👈 ensures clicks work
  },
  navBtn: {
    padding: 8,
  },
  navText: {
    fontSize: 12,
    color: '#0071CE',
    fontWeight: '600',
  },
  addBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#0071CE',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -24,        // 👈 floating "+"
  },
  addText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});
