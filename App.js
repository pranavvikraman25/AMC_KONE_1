import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

/*
  SCREENS:
  splash
  login
  dashboard
  elevator
  floor
  report
  kmp
*/

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [selectedElevator, setSelectedElevator] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);

  // Simple screen switcher
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return (
          <SplashScreen
            onFinish={() => setCurrentScreen('login')}
          />
        );

      case 'login':
        return (
          <LoginScreen
            onLoginSuccess={() => setCurrentScreen('dashboard')}
          />
        );

      case 'dashboard':
        return (
          <DashboardScreen
            onSelectElevator={(elv) => {
              setSelectedElevator(elv);
              setCurrentScreen('elevator');
            }}
          />
        );

      case 'elevator':
        return (
          <ElevatorDetailScreen
            elevator={selectedElevator}
            onSelectFloor={(floor) => {
              setSelectedFloor(floor);
              setCurrentScreen('floor');
            }}
            onBack={() => setCurrentScreen('dashboard')}
          />
        );

      case 'floor':
        return (
          <FloorMaintenanceScreen
            elevator={selectedElevator}
            floor={selectedFloor}
            onFinish={() => setCurrentScreen('report')}
            onBack={() => setCurrentScreen('elevator')}
          />
        );

      case 'report':
        return (
          <ReportScreen
            onBackToHome={() => setCurrentScreen('dashboard')}
          />
        );

      default:
        return <Text>Unknown Screen</Text>;
    }
  };

  return <View style={styles.appContainer}>{renderScreen()}</View>;
}

/* ------------------ PLACEHOLDER SCREENS ------------------ */
/* These will be replaced one by one in next steps */

function SplashScreen({ onFinish }) {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>KONE</Text>
      <Pressable style={styles.button} onPress={onFinish}>
        <Text style={styles.buttonText}>Start</Text>
      </Pressable>
    </View>
  );
}

function LoginScreen({ onLoginSuccess }) {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Login</Text>
      <Pressable style={styles.button} onPress={onLoginSuccess}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
}

function DashboardScreen({ onSelectElevator }) {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Dashboard</Text>
      <Pressable
        style={styles.button}
        onPress={() => onSelectElevator('ELV-001')}
      >
        <Text style={styles.buttonText}>Open Elevator ELV-001</Text>
      </Pressable>
    </View>
  );
}

function ElevatorDetailScreen({ elevator, onSelectFloor, onBack }) {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Elevator {elevator}</Text>
      <Pressable
        style={styles.button}
        onPress={() => onSelectFloor(7)}
      >
        <Text style={styles.buttonText}>Go to Floor 7</Text>
      </Pressable>

      <Pressable style={styles.link} onPress={onBack}>
        <Text>⬅ Back</Text>
      </Pressable>
    </View>
  );
}

function FloorMaintenanceScreen({ elevator, floor, onFinish, onBack }) {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>
        {elevator} – Floor {floor}
      </Text>

      <Pressable style={styles.button} onPress={onFinish}>
        <Text style={styles.buttonText}>End Maintenance</Text>
      </Pressable>

      <Pressable style={styles.link} onPress={onBack}>
        <Text>⬅ Back</Text>
      </Pressable>
    </View>
  );
}

function ReportScreen({ onBackToHome }) {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Report Generated</Text>

      <Pressable style={styles.button} onPress={onBackToHome}>
        <Text style={styles.buttonText}>Back to Dashboard</Text>
      </Pressable>
    </View>
  );
}

/* ------------------ STYLES ------------------ */

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0071CE',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  link: {
    marginTop: 20,
  },
});
