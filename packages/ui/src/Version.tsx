import { StyleSheet, View, Text } from 'react-native';

interface VersionProps {
  expoVersion?: string;
  reactVersion?: string;
  reactNativeVersion?: string;
  reactNativeWebVersion?: string;
}

export function Version(props: VersionProps) {
  return (
    <View style={$container}>
      <Text style={[$text, { marginVertical: 16 }]}>
        You are looking at a component in environment:
      </Text>
      <View>
        {getVersions(props).map(({ name, version }) => (
          <View key={`${name}-${version}`}>
            <Text style={$name}>
              {name} = <Text style={$version}>{version}</Text>
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const { $container, $text, $name, $version } = StyleSheet.create({
  $container: {
    flex: 1,
    flexDirection: 'column',
  },
  $text: {
    fontSize: 18,
    color: 'inherit',
  },
  $name: {
    fontStyle: 'italic',
  },
  $version: {
    fontWeight: 'bold',
  }
});

function getVersions(props: VersionProps) {
  const {
    expoVersion,
    reactVersion,
    reactNativeVersion,
    reactNativeWebVersion
  } = props;

  return [
    { name: 'Expo', version: expoVersion ?? '???' },
    { name: 'React', version: reactVersion ?? '???' },
    { name: 'React Native', version: reactNativeVersion ?? '???' },
    { name: 'React Native Web', version: reactNativeWebVersion ?? '???' },
  ];
}
