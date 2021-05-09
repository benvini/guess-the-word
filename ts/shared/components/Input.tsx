import React, { FunctionComponent, useCallback, useState } from 'react';
import styled from 'styled-components/native';

type Props = {
    style?: object,
    editable?: boolean,
    value: string
}

const StyledInput = styled.TextInput`
    padding: 4px;
    border-width: 0;
    height: 27px;
    width: 27px;
    margin-bottom: 8px;
    margin-top: 16px;
    color: black;
    text-align: center;
`

const Input: FunctionComponent<Props> = ({ style, editable, value }: Props) => {
    const [inputText, setInputText] = useState(value);

    const onChangeText = useCallback((text) => {
        setInputText(text);
    }, []);

    return (
        <StyledInput style={{ ...style }} editable={editable} value={inputText} onChangeText={onChangeText} maxLength={1} />
    )
}

export default Input;