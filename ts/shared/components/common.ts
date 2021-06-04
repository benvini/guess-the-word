import styled from 'styled-components/native';

export const Screen = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: ${({theme: {palette}}) => palette.backgroundColor};
`;
