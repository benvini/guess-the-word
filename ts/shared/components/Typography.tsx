import React, { FunctionComponent } from 'react';
import styled from 'styled-components/native';

type Props = {
  style?: object,
  children: React.ReactNode
};

const Container = styled.View``
const StyledText = styled.Text`
  font-size: 16px;
  color: black;
`

const Typography: FunctionComponent<Props> = ({ style, children }: Props) => {
  return (
    <Container style={{ ...style }}>
      <StyledText>
        {children}
      </StyledText>
    </Container>
  );
};

export default Typography;
