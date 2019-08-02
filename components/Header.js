import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// Body
const Header = ({ title }) => {
  const { headerContainer, headerText } = styles;
  return (
    <View style={headerContainer}>
      <Text style={headerText}>{title}</Text>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  headerContainer: {
    height: 80,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#4bcffc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    elevation: 8,
    position: 'relative',
  },
  headerText: {
    margin: 24,
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

// Export
export { Header };
