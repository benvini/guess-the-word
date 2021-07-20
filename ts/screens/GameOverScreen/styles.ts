import COLOR from '../../styles/Color';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    marginBottom: 4,
    borderColor: COLOR.PRIMARY,
    borderWidth: 3,
  },
  cardTitle: {
    color: COLOR.PRIMARY,
    fontWeight: 'bold',
    fontSize: 24,
  },
  cardDivider: {
    backgroundColor: COLOR.PRIMARY,
    height: 2,
  },
  submitButton: {
    backgroundColor: COLOR.SUCCESS,
    marginTop: 12,
  },
  leaderboardsButton: {
    width: 140,
  },
});
