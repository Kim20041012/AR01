import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

export default class ResultScreen extends Component {
  constructor(props) {
    super(props);
    const { finalWeight, matchedColor } = this.props.route.params;
    this.state = {
      finalWeight: finalWeight,
      matchedColor: matchedColor,
      weightUnit: 'kg',
    };
  }

  // Fixed dose mapping table for each color.
  dosageMap = {
    grey: {
      Fentanyl: "5 mcg/0.1mL",
      Midazolam: "0.5 mg/0.1mL",
      Epinephrine: "0.05 mg/0.5mL",
    },
    pink: {
      Fentanyl: "5 mcg/0.1mL",
      Midazolam: "0.5 mg/0.1mL",
      Epinephrine: "0.07 mg/0.7mL",
    },
    red: {
      Fentanyl: "10 mcg/0.2mL",
      Midazolam: "1 mg/0.2mL",
      Epinephrine: "0.09 mg/0.9mL",
    },
    purple: {
      Fentanyl: "10 mcg/0.2mL",
      Midazolam: "1 mg/0.2mL",
      Epinephrine: "0.1 mg/1mL",
    },
    yellow: {
      Fentanyl: "15 mcg/0.3mL",
      Midazolam: "1.5 mg/0.3mL",
      Epinephrine: "0.13 mg/1.3mL",
    },
    white: {
      Fentanyl: "15 mcg/0.3mL",
      Midazolam: "2 mg/0.4mL",
      Epinephrine: "0.15 mg/1.5mL",
    },
    blue: {
      Fentanyl: "20 mcg/0.4mL",
      Midazolam: "2 mg/0.4mL",
      Epinephrine: "0.2 mg/2mL",
    },
    orange: {
      Fentanyl: "25 mcg/0.5mL",
      Midazolam: "2.5 mg/0.5mL",
      Epinephrine: "0.25 mg/2.5mL",
    },
    green: {
      Fentanyl: "35 mcg/0.7mL",
      Midazolam: "3.5 mg/0.7mL",
      Epinephrine: "0.35 mg/3.5mL",
    },
  };

  convertWeight = (weight, unit) => {
    return unit === 'kg' ? weight : weight * 2.20462; // Convert between kg and lb without altering dosage.
  };

  render() {
    const { navigation } = this.props;
    const { finalWeight, matchedColor, weightUnit } = this.state;
    const displayedWeight = parseFloat(
      this.convertWeight(finalWeight, weightUnit).toFixed(1)
    );
    const currentDosages = this.dosageMap[matchedColor] || {};

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Estimated Weight</Text>
        <Text style={[styles.result, { color: matchedColor }]}> {displayedWeight} {weightUnit} </Text>

        <SegmentedControl
          values={['kg', 'lb']}
          selectedIndex={weightUnit === 'kg' ? 0 : 1}
          onChange={(event) =>
            this.setState({
              weightUnit: event.nativeEvent.selectedSegmentIndex === 0 ? 'kg' : 'lb',
            })
          }
          style={styles.segmentedControl}
        />

        <ScrollView style={styles.dosageContainer}>
          <Text style={styles.dosageTitle}>Dosage Recommendations:</Text>
          {Object.keys(currentDosages).map((key, index) => (
            <View key={index} style={styles.codeBlock}>
              <Text style={styles.codeText}>Medication: {key}</Text>
              <Text style={styles.codeText}>Dosage: {currentDosages[key]}</Text>
              <Text style={styles.codeText}>Patient weight: {displayedWeight} {weightUnit}</Text>
              <Text style={styles.codeText}>-----------------------------</Text>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  result: { fontSize: 32, fontWeight: 'bold', marginBottom: 30 },
  segmentedControl: { width: 200, marginBottom: 30 },
  dosageContainer: { width: '90%', marginBottom: 30 },
  dosageTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  codeBlock: {
    backgroundColor: '#1e1e1e',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  codeText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    color: '#dcdcdc',
    marginVertical: 2,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 150,
    borderRadius: 10,
    marginBottom: 30,
  },
  buttonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
});
