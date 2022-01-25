import React from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';

const getColor = (props) => {
    // if (acceptedFiles.length = 1) return '#407BA7'
    if (props.isDragAccept) return '#00e676';
    else if (props.isDragReject) return '#FF002B';
    else if (props.isFocused) return '#2196f3';
    else return '#eeeeee';
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;

function ImageDropzone(props) {
  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({accept: 'image/', maxFiles: 1});

  return (
    <div className="container">
      <Container {...getRootProps({isFocused, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        <p>Drag and drop image file here, or click to select a file.</p>
      </Container>
    </div>
  );
}

export default ImageDropzone;
