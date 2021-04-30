import 'semantic-ui-css/semantic.min.css'
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import ReduxConfiguration from "./store/ReduxConfiguration";

ReactDOM.render(
  <React.StrictMode>
      <ReduxConfiguration>
          <App />
      </ReduxConfiguration>
  </React.StrictMode>,
  document.getElementById('root')
);
