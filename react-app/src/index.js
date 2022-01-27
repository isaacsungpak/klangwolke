import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ModalProvider } from "./context/Modal";

import App from './App';
import store from './store';
import SongProvider from './context/SongContext';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <SongProvider>
          <App />
        </SongProvider>
        </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
