import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';

/*
  Props expected:
  - reportData (object):
      {
        elevator,
        floor,
        totalTime,
        stationaryTime
      }
  - onBackToHome : function()
*/

export default function ReportSummaryScreen({
  reportData,
  onBackToHome,
}) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    if (reportData) {
      setReports((prev) => [
        {
          ...reportData,
          id: Date.now(),
          timestamp: new Date().toLocaleString(),
        },
        ...prev,
      ]);
    }
  }, []);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}m ${sec}s`;
  };

  const efficiency =
    reportData && reportData.totalTime > 0
      ? Math.round(
          (reportData.stationaryTime /
            reportData.totalTime) *
            100
        )
      : 0;

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <Text style={styles.title}>Maintenance Report</Text>

      {/* CURRENT REPORT */}
      {reportData && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Current Task Summary
          </Text>

          <InfoRow label="Elevator" value={reportData.elevator} />
          <InfoRow label="Floor" value={`Floor ${reportData.floor}`} />
          <InfoRow
            label="Total Time"
            value={formatTime(reportData.totalTime)}
          />
          <InfoRow
            label="Stationary Time"
            value={formatTime(reportData.stationaryTime)}
          />
          <InfoRow
            label="Efficiency"
            value={`${efficiency}%`}
          />
        </View>
      )}

      {/* PREVIOUS REPORTS */}
      {reports.length > 1 && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Previous Reports
          </Text>

          {reports.slice(1).map((r) => (
            <View key={r.id} style={styles.reportItem}>
              <Text style={styles.reportText}>
                {r.elevator} – Floor {r.floor}
              </Text>
              <Text style={styles.reportSub}>
                {r.timestamp}
              </Text>
              <Text style={styles.reportSub}>
                Time: {formatTime(r.totalTime)} | Efficiency:{' '}
                {Math.round(
                  (r.stationaryTime / r.totalTime) * 100
                )}
                %
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* ACTION */}
      <Pressable style={styles.button} onPress={onBackToHome}>
        <Text style={styles.buttonText}>
          Back to Dashboard
        </Text>
      </Pressable>
    </ScrollView>
  );
}

/* -------- SMALL REUSABLE ROW -------- */

function InfoRow({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
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

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0071CE',
    marginBottom: 15,
  },

  card: {
    backgroundColor: '#f5f7fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  rowLabel: {
    fontSize: 14,
    color: '#555',
  },
  rowValue: {
    fontSize: 14,
    fontWeight: '600',
  },

  reportItem: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingBottom: 8,
  },
  reportText: {
    fontSize: 14,
    fontWeight: '600',
  },
  reportSub: {
    fontSize: 12,
    color: '#666',
  },

  button: {
    backgroundColor: '#0071CE',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});
