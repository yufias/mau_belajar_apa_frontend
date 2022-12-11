import styled from 'styled-components';

export const Btn = styled.button`
    color: ${props => props.outline ? "#6F32D2" : "#fff"};
    background-color: ${ props => props.outline ? "#fff" : "#6F32D2"};
    padding: 0.5rem;
    border-radius: 5px;
    border-color: #6F32D2;
    cursor: pointer;
    &:hover {
        background-color: ${ props => props.outline ? "#c4c4c4" : "#5624a6"};
    }
`;