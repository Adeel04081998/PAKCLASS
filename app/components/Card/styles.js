import { StyleSheet } from 'react-native';
import * as Utils from '@utils';


export default StyleSheet.create({
  imageBanner: { flex: 1, borderRadius: 8 },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  content: {
    position: 'absolute',
    alignItems: 'flex-start',
    bottom: 0,
    padding: 10,
  },
  girdContentRate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  listImage: {
    height: Utils.scaleWithPixel(140),
    width: Utils.scaleWithPixel(120),
    borderRadius: 8,
  },
});
