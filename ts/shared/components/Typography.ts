import styled from 'styled-components/native';

const Typography = styled.Text`
  font-size: 16px;
  color: ${({theme: {palette}}) => palette.textColor};
`;

export default Typography;
