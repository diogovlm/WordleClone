import { View, Text } from 'react-native';
import { colors } from '../../constants';

const Number = ({ number, label }) => {
  return (
    <View style={{ alignItems: 'center', margin: 10 }}>
      <Text
        style={{ color: colors.lightgrey, fontSize: 30, fontWeight: 'bold' }}
      >
        {number}
      </Text>
      <Text style={{ color: colors.lightgrey, fontSize: 15 }}>{label}</Text>
    </View>
  );
}; //Show some user's numbers and labels

export default Number;
