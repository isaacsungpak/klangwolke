import styled from "styled-components";

const Button = styled.div`
    font-family: 'Roboto Condensed', sans-serif;
    color: black;
    outline: none;
    border: 1px black solid;
    background-color: white;
    font-size: 16px;
    font-weight: 500;
    padding: 7px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        box-shadow: 1px 3px 2px rgba(0, 0, 0, 0.3);
    }
`

function RectangularButton(props) {
    return (
        <Button>
            {props.children}
        </Button>
    )
}

export default RectangularButton;
