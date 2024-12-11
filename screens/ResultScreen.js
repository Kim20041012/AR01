import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

export default function ResultScreen({ route, navigation }) {
  const { finalWeight, matchedColor } = route.params;
  const [weightUnit, setWeightUnit] = useState('kg');

  // 颜色与对应剂量信息映射表
  const dosageMap = {
    grey: {
      Fentanyl: "5 mcg/0.1mL",
      Midazolam: "0.5 mg/0.1mL",
      Epinephrine: "0.05 mg/0.5mL"
    },
    pink: {
      Fentanyl: "5 mcg/0.1mL",
      Midazolam: "0.5 mg/0.1mL",
      Epinephrine: "0.07 mg/0.7mL"
    },
    red: {
      Fentanyl: "10 mcg/0.2mL",
      Midazolam: "1 mg/0.2mL",
      Epinephrine: "0.09 mg/0.9mL"
    },
    purple: {
      Fentanyl: "10 mcg/0.2mL",
      Midazolam: "1 mg/0.2mL",
      Epinephrine: "0.1 mg/1mL"
    },
    yellow: {
      Fentanyl: "15 mcg/0.3mL",
      Midazolam: "1.5 mg/0.3mL",
      Epinephrine: "0.13 mg/1.3mL"
    },
    white: {
      Fentanyl: "15 mcg/0.3mL",
      Midazolam: "2 mg/0.4mL",
      Epinephrine: "0.15 mg/1.5mL"
    },
    blue: {
      Fentanyl: "20 mcg/0.4mL",
      Midazolam: "2 mg/0.4mL",
      Epinephrine: "0.2 mg/2mL"
    },
    orange: {
      Fentanyl: "25 mcg/0.5mL",
      Midazolam: "2.5 mg/0.5mL",
      Epinephrine: "0.25 mg/2.5mL"
    },
    green: {
      Fentanyl: "35 mcg/0.7mL",
      Midazolam: "3.5 mg/0.7mL",
      Epinephrine: "0.35 mg/3.5mL"
    }
  };

  const convertWeight = (weight, unit) => {
    return unit === 'kg' ? weight : weight * 2.20462;
  };

  const displayedWeight = convertWeight(finalWeight, weightUnit).toFixed(1);

  const currentDosages = dosageMap[matchedColor] || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estimated Weight</Text>
      <Text style={[styles.result, { color: matchedColor }]}>
        {displayedWeight} {weightUnit}
      </Text>

      <SegmentedControl
        values={['kg', 'lb']}
        selectedIndex={weightUnit === 'kg' ? 0 : 1}
        onChange={(event) =>
          setWeightUnit(event.nativeEvent.selectedSegmentIndex === 0 ? 'kg' : 'lb')
        }
        style={styles.segmentedControl}
      />

      <View style={styles.dosageContainer}>
        <Text style={styles.dosageTitle}>Dosage Recommendations:</Text>
        <Text style={styles.dosageText}>Fentanyl(IV,IO): {currentDosages.Fentanyl || 'N/A'}</Text>
        <Text style={styles.dosageText}>Midazolam(IV,IO): {currentDosages.Midazolam || 'N/A'}</Text>
        <Text style={styles.dosageText}>Epinephrine 1 mg/10ml(IV): {currentDosages.Epinephrine || 'N/A'}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  result: { fontSize: 32, fontWeight: 'bold', marginBottom: 30 },
  segmentedControl: { width: 200, marginBottom: 30 },
  dosageContainer: { marginBottom: 30, alignItems: 'center' },
  dosageTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  dosageText: { fontSize: 16, marginBottom: 5 },
  button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 16 },
});
