import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './store';
import SongProvider from './context/SongContext';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <SongProvider>
          <App />
        </SongProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
