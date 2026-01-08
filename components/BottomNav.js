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
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
    backgroundColor: '#fff',
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
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0071CE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
});
