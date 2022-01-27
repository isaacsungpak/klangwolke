import React from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';
import { useEffect } from 'react';

const getColor = (props) => {
    if (props.isDragAccept) return '#00043A';
    else if (props.isDragReject) return '#FF002B';
    else if (props.isFocused) return '#407BA7';
    else if (props.acceptedFiles[0]) return '#407BA7'
    else return '#EEE';
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  margin: 20px;
  aspect-ratio: 6;
  border-width: 3px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: groove;
  background-color: ${props => props.acceptedFiles[0] ? '#407BA7' : '#fafafa'};
  color: ${props => props.acceptedFiles[0] ? 'white' : '#CCC'};
  outline: none;
  transition: all .3s ease-in-out;
  cursor: pointer;
`;

function FileDropzone(props) {
  const { fileSetter, type, formats } = props;

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({accept: `${formats}`, maxFiles: 1});

  useEffect(() => {
    console.log(acceptedFiles[0]?.path);
    fileSetter(acceptedFiles[0]);
  }, [fileSetter, acceptedFiles]);

  return (
    <div className="container">
      <Container {...getRootProps({isFocused, isDragAccept, isDragReject, acceptedFiles})}>
        <input {...getInputProps()} />
        { acceptedFiles[0] ?
            <div>{acceptedFiles[0].path}</div>:
            <>
              <div>{`Drag and drop ${type} file here,`}</div>
              <div>or click to select a file.</div>
            </>
        }
      </Container>
    </div>
  );
}

export default FileDropzone;
