import { TextStyle } from 'react-native';

// Font weights with proper typing
export const FontWeight = {
  normal: 'normal' as TextStyle['fontWeight'],
  bold: 'bold' as TextStyle['fontWeight'],
  '100': '100' as TextStyle['fontWeight'],
  '200': '200' as TextStyle['fontWeight'],
  '300': '300' as TextStyle['fontWeight'],
  '400': '400' as TextStyle['fontWeight'],
  '500': '500' as TextStyle['fontWeight'],
  '600': '600' as TextStyle['fontWeight'],
  '700': '700' as TextStyle['fontWeight'],
  '800': '800' as TextStyle['fontWeight'],
  '900': '900' as TextStyle['fontWeight'],
};

// Common styles to avoid repetition
export const commonStyles = {
  textBold: {
    fontWeight: FontWeight.bold,
  },
  text600: {
    fontWeight: FontWeight['600'],
  },
  text500: {
    fontWeight: FontWeight['500'],
  },
};
