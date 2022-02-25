import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { colors, colorsToEmoji } from '../../constants';
import * as Clipboard from 'expo-clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Number from '../Number';
import GuessDistribution from '../GuessDistribution';

const EndScreen = ({ rows, getCellBGColor, pokemon }) => {
  const [secondsTillTomorrow, setSecondsTillTomorrow] = useState(0);
  const [played, setPlayed] = useState(0);
  const [winRate, setWinRate] = useState(0);
  const [curStreak, setCurStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [distribution, setDistribution] = useState();

  useEffect(() => {
    readState();
  }, []);

  const readState = async () => {
    const dataString = await AsyncStorage.getItem('@game');
    let data;

    try {
      data = JSON.parse(dataString);
    } catch (e) {
      console.log("Couldn't parse the state");
    }

    const keys = Object.keys(data);
    const values = Object.values(data);

    setPlayed(keys.length);
    console.log(data);
    const numberOfWins = values.filter(
      (game) => game.gameState === 'won'
    ).length;
    setWinRate(Math.floor((100 * numberOfWins) / keys.length));
    let currentStreak = 0;
    let maximumStreak = 0;
    let prevDay = 0;
    keys.forEach((key) => {
      const day = parseInt(key.split('-')[1]);
      if (data[key].gameState === 'won' && currentStreak === 0) {
        currentStreak += 1;
      } else if (data[key].gameState === 'won' && prevDay + 1 === day) {
        currentStreak += 1;
      } else {
        currentStreak = data[key].gameState === 'won' ? 1 : 0;
      }
      if (currentStreak >= maxStreak) {
        maximumStreak = currentStreak;
      }
      prevDay = day;
    });
    setCurStreak(currentStreak);
    setMaxStreak(maximumStreak);

    const dist = [0, 0, 0, 0, 0, 0];

    values.map((game) => {
      if (game.gameState === 'won') {
        const tries = game.curRow - 1;
        dist[tries] = dist[tries] + 1;
      }
    });

    setDistribution(dist);
  }; //Read async storage to get user data

  const share = () => {
    const textShare = rows
      .map((row, i) =>
        row.map((cell, j) => colorsToEmoji[getCellBGColor(i, j)]).join('')
      )
      .filter((row) => row)
      .join('\n'); //Map all the rows and give colorful squares according to background and then filter only the rows that contain anything

    Clipboard.setString(textShare);
    Alert.alert('Copied Successfully', 'Share your score on your social media');
  }; //Make a copy of result on clipboard and it is ready to share

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const tomorrow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
      );

      setSecondsTillTomorrow((tomorrow - now) / 1000);
    };
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []); //Date information

  const formatSeconds = () => {
    const hours = Math.floor(secondsTillTomorrow / (60 * 60));
    const minutes = Math.floor((secondsTillTomorrow % (60 * 60)) / 60);
    const seconds = Math.floor(secondsTillTomorrow % 60);
    return `${hours}:${minutes}:${seconds}`;
  }; //Timer to next word

  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <Text style={styles.title}>IT'S {pokemon}</Text>

      <Text style={styles.subtitle}>Statistics</Text>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <Number number={played} label={'Played'} />
        <Number number={winRate} label={'Win %'} />
        <Number number={curStreak} label={'Cur streak'} />
        <Number number={maxStreak} label={'Max streak'} />
      </View>

      <GuessDistribution distribution={distribution} />

      <View style={{ flexDirection: 'row', padding: 10 }}>
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Text style={{ color: colors.lightgrey }}>Next Wordle</Text>
          <Text
            style={{
              color: colors.lightgrey,
              fontSize: 24,
              fontWeight: 'bold',
            }}
          >
            {formatSeconds()}
          </Text>
        </View>

        <Pressable
          onPress={share}
          style={{
            flex: 1,
            backgroundColor: colors.primary,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: colors.lightgrey, fontWeight: 'bold' }}>
            Share
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    marginVertical: 15,
  },
  subtitle: {
    fontSize: 20,
    color: colors.lightgrey,
    textAlign: 'center',
    marginVertical: 15,
  },
});

export default EndScreen;
