import styled, {css} from 'styled-components/native';

const rtlIOSCss = css`
  text-align: right;
`;

const Typography = styled.Text`
  font-size: 16px;
  color: ${({theme: {palette}}) => palette.textColor};
  ${({theme: {isIOS, isRTL}}) => isIOS && isRTL && rtlIOSCss};
`;

export default Typography;
