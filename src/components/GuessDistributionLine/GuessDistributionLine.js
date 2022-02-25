import { View, Text } from 'react-native';
import { colors } from '../../constants';

const GuessDistributionLine = ({ position, amount, percentage }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
      <Text style={{ color: colors.lightgrey }}>{position}</Text>
      <View
        style={{
          alignSelf: 'stretch',
          width: `${percentage}%`,
          backgroundColor: colors.grey,
          margin: 5,
          padding: 5,
        }}
      >
        <Text style={{ color: colors.lightgrey }}>{amount}</Text>
      </View>
    </View>
  );
}; //Number of tries bars

export default GuessDistributionLine;
