import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { colors } from './src/constants';
import Keyboard from './src/components/Keyboard';

const NUMBER_OF_TRIES = 6;

export default function App() {
  const word = 'hello';
  const letters = word.split(''); // ['h', 'e', 'l', 'l', 'o']

  const rows = new Array(NUMBER_OF_TRIES).fill(
    new Array(letters.length).fill('')
  ); //generate dinamically rows with blank valuesn based on number of tries and word length

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <Text style={styles.title}>WORDLE</Text>
      <View style={styles.map}>
        {rows.map((row) => (
          <View style={styles.row}>
            {row.map((cell) => (
              <View style={styles.cell}>
                <Text style={styles.cellText}>{cell.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
      <Keyboard />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
  },
  title: {
    color: colors.lightgrey,
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 7,
  },
  map: {
    marginVertical: 20,
    alignSelf: 'stretch',
    height: 100,
  },
  row: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cell: {
    borderWidth: 3,
    borderColor: colors.darkgrey,
    flex: 1, //divide equally space with brothers
    maxWidth: 70, //Make sure it will be visible with less letters
    aspectRatio: 1, //1:1 ratio, square cells
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    color: colors.lightgrey,
    fontWeight: 'bold',
    fontSize: 28,
  },
});
