import { useState, useEffect } from 'react';
import { Text, View, Alert } from 'react-native';
import { colors, CLEAR, ENTER, colorsToEmoji } from '../../constants';
import Keyboard from '../Keyboard';
import * as Clipboard from 'expo-clipboard';
import words from '../../words';
import styles from './Game.styles';
import { copyArray, getDayOfTheYear, getDayKey } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NUMBER_OF_TRIES = 6;

const dayOfTheYear = getDayOfTheYear();
const dayKey = getDayKey();

const Game = () => {
  const word = words[dayOfTheYear].toLowerCase();
  const letters = word.split('');

  const [rows, setRows] = useState(
    new Array(NUMBER_OF_TRIES).fill(new Array(letters.length).fill(''))
  ); //generate dinamically rows with blank values based on number of tries and word length
  const [curRow, setCurRow] = useState(0);
  const [curCol, setCurCol] = useState(0);
  const [gameState, setGameState] = useState('playing'); //won, lost, playing
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (curRow > 0) {
      checkGameState();
    }
  }, [curRow]); // Every time curRow is updated this useEffect will be called

  useEffect(() => {
    if (loaded) {
      persistState();
    }
  }, [rows, curCol, curRow, gameState]); //Save progress at every change ingame

  useEffect(() => {
    readState();
  }, []); //Read storage at start of component

  const persistState = async () => {
    const dataForToday = {
      rows,
      curCol,
      curRow,
      gameState,
    };

    try {
      const existingStateString = await AsyncStorage.getItem('@game');
      const existingState = existingStateString
        ? JSON.parse(existingStateString)
        : {}; //If there is data it will parse, otherwise will give blank

      existingState[dayKey] = dataForToday;

      const dataString = JSON.stringify(existingState);
      await AsyncStorage.setItem('@game', dataString);
    } catch (e) {
      console.log('Failed to write data to async storage', e);
    }
  }; //Write all the state variables in async storage

  const readState = async () => {
    const dataString = await AsyncStorage.getItem('@game');
    try {
      const data = JSON.parse(dataString);
      const day = data[dayKey];
      setRows(day.rows);
      setCurCol(day.curCol);
      setCurRow(day.curRow);
      setGameState(day.gameState);
    } catch (e) {
      console.log("Couldn't parse the state");
    }

    setLoaded(true);
  }; //Read async storage to know if there is a game in progress

  const checkGameState = () => {
    if (checkIfWon()) {
      Alert.alert('Yay', 'You won!', [{ text: 'Share', onPress: shareScore }]);
      setGameState('won');
    } else if (checkIfLost()) {
      Alert.alert('Meh', 'Try again Tomorrow!');
      setGameState('lost');
    }
  }; //Check current game state - won, lost, playing

  const shareScore = () => {
    const textShare = rows
      .map((row, i) =>
        row.map((cell, j) => colorsToEmoji[getCellBGColor(i, j)]).join('')
      )
      .filter((row) => row)
      .join('\n'); //Map all the rows and give colorful squares according to background and then filter only the rows that contain anything

    Clipboard.setString(textShare);
    Alert.alert('Copied Successfully', 'Share your score on your social media');
  }; //Make a copy of result on clipboard and it is ready to share

  const checkIfWon = () => {
    const row = rows[curRow - 1];

    return row.every((letter, i) => letter === letters[i]);
  }; //Return true if every letter from the row matches de array with the word splitted

  const checkIfLost = () => {
    return curRow === NUMBER_OF_TRIES;
  }; //Return true if the current row gets to the number of tries

  const onKeyPressed = (key) => {
    if (gameState !== 'playing') {
      return;
    } //Cannot keep playing if the game state is not playing

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
  }; //Function to decide what to do according to the key pressed

  const isCellActive = (row, col) => {
    return row === curRow && col === curCol;
  }; //Position of the current cell

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
  }; //Set background color of each cell

  const getAllLettersWithColor = (color) => {
    return rows.flatMap((row, i) =>
      row.filter((cell, j) => getCellBGColor(i, j) === color)
    );
  }; //flatMap maps everything and merge the results. Then it will filter based on the return of BG Color function

  const greenCaps = getAllLettersWithColor(colors.primary);
  const yellowCaps = getAllLettersWithColor(colors.secondary);
  const greyCaps = getAllLettersWithColor(colors.darkgrey);

  return (
    <>
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
    </>
  );
};

export default Game;