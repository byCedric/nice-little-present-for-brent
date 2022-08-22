import { Version } from '@acme/ui';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Version
        expoVersion={require('expo/package.json').version}
        reactVersion={require('react/package.json').version}
        reactNativeVersion={require('react-native/package.json').version}
        reactNativeWebVersion={require('react-native-web/package.json').version}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 32,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
