import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
} from 'react-native';

/*
  Props expected from App.js:
  - elevator        : string (ELV-001)
  - onSelectFloor   : function(floorNumber)
  - onBack          : function()
*/

export default function ElevatorDetailScreen({
  elevator,
  onSelectFloor,
  onBack,
}) {
  const [activeTab, setActiveTab] = useState('floors');

  // Example: 12-floor elevator
  const floors = Array.from({ length: 12 }, (_, i) => i + 1);

  // Demo issues (same pattern for all floors for now)
  const issues = [
    'Door operation check',
    'Brake system inspection',
    'Lubrication verification',
    'Sensor alignment check',
  ];

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.back}>⬅</Text>
        </Pressable>
        <Text style={styles.headerTitle}>{elevator}</Text>
      </View>

      {/* TAB SWITCH */}
      <View style={styles.tabRow}>
        <TabButton
          label="Floors"
          active={activeTab === 'floors'}
          onPress={() => setActiveTab('floors')}
        />
        <TabButton
          label="Issues"
          active={activeTab === 'issues'}
          onPress={() => setActiveTab('issues')}
        />
      </View>

      {/* CONTENT */}
      {activeTab === 'floors' ? (
        <FlatList
          data={floors}
          keyExtractor={(item) => item.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() => onSelectFloor(item)}
            >
              <Text style={styles.cardTitle}>Floor {item}</Text>
              <Text style={styles.subText}>
                Tap to start maintenance
              </Text>
            </Pressable>
          )}
        />
      ) : (
        <FlatList
          data={floors}
          keyExtractor={(item) => item.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.issueCard}>
              <Text style={styles.cardTitle}>
                Floor {item}
              </Text>

              {issues.map((issue, index) => (
                <Text key={index} style={styles.issueText}>
                  • {issue}
                </Text>
              ))}
            </View>
          )}
        />
      )}
    </View>
  );
}

/* -------- TAB BUTTON -------- */

function TabButton({ label, active, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.tabButton,
        active && styles.tabButtonActive,
      ]}
    >
      <Text
        style={[
          styles.tabText,
          active && styles.tabTextActive,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  back: {
    fontSize: 18,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0071CE',
  },

  tabRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
  },
  tabButtonActive: {
    backgroundColor: '#0071CE',
  },
  tabText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#ffffff',
  },

  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  card: {
    backgroundColor: '#f5f7fa',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  issueCard: {
    backgroundColor: '#f9fafc',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  subText: {
    fontSize: 12,
    color: '#666',
  },
  issueText: {
    fontSize: 13,
    color: '#444',
    marginTop: 2,
  },
});
