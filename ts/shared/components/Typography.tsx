import React, {FunctionComponent} from 'react';
import styled from 'styled-components/native';

type Props = {
    fontWeight?: React.CSSProperties,
    fontSize?: React.CSSProperties,
};

const Container = styled.Text`
  font-size: 16px;
  ${(props: Props) => props.fontWeight && `font-weight: ${props.fontWeight}`};
  ${(props: Props) => props.fontSize && `font-size: ${props.fontSize}`};
  color: black;
`

const Typography: FunctionComponent<Props> = (props) => {
  return (
    <Container {...props}/>
  );
};

export default Typography;
