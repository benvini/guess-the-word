import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import Typography from './Typography';
import COLOR from '../../styles/Color';

const Container = styled.View`
    margin: 8px;
`

const StyledButton = styled.TouchableOpacity`
    font-weight: bold;
    background-color: ${COLOR.SECONDARY};
    padding: 10px;
    align-items: center;
    width: 120px;
    border-radius: 4px;
`

type Props = {
    onPress: () => void,
    disabled: boolean,
    title: string,
    style: object
}

const MainButton = ({ onPress, disabled = false, title, style }: Props) => {
    const opacity = disabled ? 0.5 : 1;

    return (
        <Container style={{ opacity }}>
            <StyledButton onPress={onPress} disabled={disabled} style={{...style}}>
            <Typography>{title}</Typography>
            </StyledButton>
        </Container>
    );
};

MainButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    title: PropTypes.string,
    style: PropTypes.object
};

MainButton.defaultProps = {
    onPress: () => { },
    disabled: false,
    title: '',
    style: {}
};

export default MainButton;
