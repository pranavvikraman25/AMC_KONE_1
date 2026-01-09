import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Modal,
  TextInput,
} from 'react-native';

export default function DashboardScreen({
  onSelectElevator,
  onOpenKMP,
  onOpenMap,
  onOpenIssues,
  onOpenReports,
}) {
  const [elevators, setElevators] = useState([
    { id: 'ELV-001', location: 'Building A' },
    { id: 'ELV-002', location: 'Building A' },
    { id: 'ELV-003', location: 'Building B' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newElvId, setNewElvId] = useState('');
  const [newLocation, setNewLocation] = useState('');

  const addElevator = () => {
    if (!newElvId) return;

    setElevators([
      ...elevators,
      { id: newElvId, location: newLocation || 'Unknown' },
    ]);

    setNewElvId('');
    setNewLocation('');
    setShowAddModal(false);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Elevators</Text>
      </View>

      {/* ELEVATOR LIST */}
      <FlatList
        contentContainerStyle={{ paddingBottom: 120 }}
        data={elevators}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => onSelectElevator(item.id)}
          >
            <Text style={styles.elvId}>{item.id}</Text>
            <Text style={styles.location}>{item.location}</Text>
          </Pressable>
        )}
      />

      {/* ADD ELEVATOR MODAL */}
      <Modal visible={showAddModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Add Elevator</Text>

            <TextInput
              style={styles.input}
              placeholder="Elevator ID (ELV-004)"
              value={newElvId}
              onChangeText={setNewElvId}
            />

            <TextInput
              style={styles.input}
              placeholder="Location"
              value={newLocation}
              onChangeText={setNewLocation}
            />

            <Pressable style={styles.modalBtn} onPress={addElevator}>
              <Text style={styles.modalBtnText}>Add</Text>
            </Pressable>

            <Pressable onPress={() => setShowAddModal(false)}>
              <Text style={styles.cancel}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <NavButton label="KMP" onPress={onOpenKMP} />
        <NavButton label="Map" onPress={onOpenMap} />

        <Pressable
          style={styles.addBtn}
          onPress={() => setShowAddModal(true)}
        >
          <Text style={styles.addBtnText}>+</Text>
        </Pressable>

        <NavButton label="Issues" onPress={onOpenIssues} />
        <NavButton label="Reports" onPress={onOpenReports} />
      </View>
    </View>
  );
}

/* ---------- Bottom Nav Button ---------- */
function NavButton({ label, onPress }) {
  return (
    <Pressable style={styles.navBtn} onPress={onPress}>
      <Text style={styles.navText}>{label}</Text>
    </Pressable>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  /* Header */
  header: {
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0071CE',
  },

  /* Cards */
  card: {
    backgroundColor: '#f5f7fa',
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 16,
    borderRadius: 10,
  },
  elvId: {
    fontSize: 16,
    fontWeight: '600',
  },
  location: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },

  /* Bottom Nav (FIXED & CLICKABLE) */
  bottomNav: {
    position: 'absolute',
    bottom: 12,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    borderRadius: 16,
    elevation: 8,
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
    marginTop: -24,
  },
  addBtnText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },

  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  modalBtn: {
    backgroundColor: '#0071CE',
    padding: 12,
    borderRadius: 8,
    marginTop: 5,
  },
  modalBtnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  cancel: {
    textAlign: 'center',
    marginTop: 10,
    color: '#666',
  },
});
