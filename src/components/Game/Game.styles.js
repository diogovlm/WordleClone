import { StyleSheet } from 'react-native';
import { colors } from '../../constants';

export default StyleSheet.create({
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
