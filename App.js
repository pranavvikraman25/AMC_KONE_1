import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import DashboardScreen from './DashboardScreen';
import ElevatorDetailScreen from './ElevatorDetailScreen';
import FloorMaintenanceScreen from './FloorMaintenanceScreen';
import MovementHeatMapScreen from './MovementHeatMapScreen';
import ReportSummaryScreen from './ReportSummaryScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');

  const [selectedElevator, setSelectedElevator] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [lastReport, setLastReport] = useState(null);

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
            onOpenKMP={() => alert('KMP screen next')}
            onOpenMap={() => alert('Map screen next')}
            onOpenIssues={() => alert('Issues screen next')}
            onOpenReports={() => setCurrentScreen('report')}
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
            onFinish={(data) => {
              setLastReport(data);
              setCurrentScreen('report');
            }}
            onBack={() => setCurrentScreen('elevator')}
          />
        );

      case 'heatmap':
        return (
          <MovementHeatMapScreen
            onBack={() => setCurrentScreen('floor')}
          />
        );

      case 'report':
        return (
          <ReportSummaryScreen
            reportData={lastReport}
            onBackToHome={() => setCurrentScreen('dashboard')}
          />
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
