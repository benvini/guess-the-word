import React, { FunctionComponent, useCallback, useState } from 'react';
import styled from 'styled-components/native';

type Props = {
    style?: object,
    editable?: boolean,
    value?: string
}

const StyledInput = styled.TextInput`
    padding: 0px;
    border-width: 0;
    width: 36px;
    margin-bottom: 8px;
    margin-top: 16px;
    margin-right: 6px;
    color: black;
    text-align: center;
    font-size: 18px;
`

const Input: FunctionComponent<Props> = ({ style, editable, value }: Props) => {
    const [inputText, setInputText] = useState(value);

    const onChangeText = useCallback((text) => {        
        setInputText(text);
    }, []);

    return (
        <StyledInput style={{ ...style }} editable={editable} value={inputText?.toUpperCase()} onChangeText={onChangeText} maxLength={1} />
    )
}

export default Input;