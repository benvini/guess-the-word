import {StyleSheet} from 'react-native';
import COLOR from '../../styles/Color';

export const styles = StyleSheet.create({
  rowHeader: {
    height: 50,
    backgroundColor: COLOR.PRIMARY,
  },
  rowHeaderText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  rowBody: {
    height: 40,
    backgroundColor: COLOR.SECONDARY,
  },
  rowBodyText: {
    textAlign: 'center',
    fontWeight: '400',
    color: 'white',
  },
});
