import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { colors, CLEAR, ENTER } from './src/constants';
import Keyboard from './src/components/Keyboard';

const NUMBER_OF_TRIES = 6;

//Literally copy an array so we can use it to update a state
const copyArray = (arr) => {
  return [...arr.map((rows) => [...rows])];
};

export default function App() {
  const word = 'hello';
  const letters = word.split(''); // ['h', 'e', 'l', 'l', 'o']

  const [rows, setRows] = useState(
    new Array(NUMBER_OF_TRIES).fill(new Array(letters.length).fill(''))
  ); //generate dinamically rows with blank values based on number of tries and word length
  const [curRow, setCurRow] = useState(0);
  const [curCol, setCurCol] = useState(0);

  //Function to decide what to do according to the key pressed
  const onKeyPressed = (key) => {
    const updatedRows = copyArray(rows);

    if (key === CLEAR) {
      const prevCol = curCol - 1;
      if (prevCol >= 0) {
        updatedRows[curRow][prevCol] = '';
        setRows(updatedRows);
        setCurCol(prevCol);
      }
      return;
    }

    if (key === ENTER) {
      if (curCol === rows[0].length) {
        setCurRow(curRow + 1);
        setCurCol(0);
      }
      return;
    }

    if (curCol < rows[0].length) {
      updatedRows[curRow][curCol] = key;
      setRows(updatedRows);
      setCurCol(curCol + 1);
    }
  };

  const isCellActive = (row, col) => {
    return row === curRow && col === curCol;
  };

  const getCellBGColor = (row, col) => {
    const letter = rows[row][col];
    if (row >= curRow) {
      return colors.black;
    } //Make sure the current row will not give the answer
    if (letter === letters[col]) {
      return colors.primary;
    } //Right answer : Green
    if (letters.includes(letter)) {
      return colors.secondary;
    } //Right letter and wrong place : Yellow
    return colors.darkgrey;
  };

  const getAllLettersWithColor = (color) => {
    return rows.flatMap((row, i) =>
      row.filter((cell, j) => getCellBGColor(i, j) === color)
    );
  }; //flatMap maps everything and merge the results. Then it will filter with the return of BG Color function

  const greenCaps = getAllLettersWithColor(colors.primary);
  const yellowCaps = getAllLettersWithColor(colors.secondary);
  const greyCaps = getAllLettersWithColor(colors.darkgrey);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <Text style={styles.title}>WORDLE</Text>
      <View style={styles.map}>
        {rows.map((row, i) => (
          <View key={`row-${i}`} style={styles.row}>
            {row.map((letter, j) => (
              <View
                key={`cell-${i}=${j}`}
                style={[
                  styles.cell,
                  {
                    borderColor: isCellActive(i, j)
                      ? colors.lightgrey
                      : colors.darkgrey,
                    backgroundColor: getCellBGColor(i, j),
                  },
                ]}
              >
                <Text style={styles.cellText}>{letter.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
      <Keyboard
        onKeyPressed={onKeyPressed}
        greenCaps={greenCaps}
        yellowCaps={yellowCaps}
        greyCaps={greyCaps}
      />
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
