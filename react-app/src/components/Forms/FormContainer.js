import styled from "styled-components"
import WaitingAnimation from "../WaitingAnimation"

const FormContainerStyling = styled.div`
  width: 450px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.5);
  background-color: white;

  #form-title {
    padding: 30px;
    padding-bottom: 0;
    font-size: 25px;
    font-weight: 700;
  }

  #form-subheader {
    padding: 10px;
    font-size: 14px;
    color: #CCC;
  }

  form {
    width: 90%;
  }

  ul {
    list-style: none;
    padding: 0;
    color: #FF002B;
  }

  .bad-input {
    color: #FF002B;
  }

  #title-input {
    flex: 1;
    display: flex;
    margin: 20px;
    margin-top: 10px;
    flex-direction: column;
  }

  label {
    font-size: 14px;
  }

  #title-input > input {
    outline: none;
    border: none;
    border-bottom: 1px solid #AAA;
    font-size: 20px;
    width: 100%;
    font-family: 'Roboto Condensed', sans-serif;
    background-color: transparent;
  }

  #title-input > input:focus {
    border-bottom: 1px solid black;
  }

  #title-holder {
    width: 80%;
    text-align: center;
    padding-bottom: 10px;
    font-size: 18px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: none;
  }

  #actual-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  #button-container {
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
  }

  #delete-button-container {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  button {
    font-family: 'Roboto Condensed', sans-serif;
    color: black;
    outline: none;
    border: 1px black solid;
    background-color: white;
    font-size: 16px;
    font-weight: 500;
    margin: 20px;
    margin-top: 0px;
    margin-bottom: 30px;
    padding: 7px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  .disabled {
    cursor: default;
    color: #CCC;
    border: 1px #CCC dashed;
  }

  button:not(.disabled):hover {
    box-shadow: 1px 3px 2px rgba(0, 0, 0, 0.3);
  }

  div.bad-input {
    margin-bottom: 14px;
  }

  textarea {
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 16px;
    resize: none;
    width: 100%;
    height: 200px;
    border: 1px solid #CCC;
    border-radius: 0;
    outline: none;
  }

  #question-template {
    margin: 10px 0;
  }

  select {
    outline: 0;
    border: 1px solid black;
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 16px;
    width: 80%;
    margin-bottom: 20px;
  }
`
function FormContainer({children, show}){
    return (
        <FormContainerStyling>
            <WaitingAnimation show={show}/>
            {children}
        </FormContainerStyling>
    )
}

export default FormContainer
