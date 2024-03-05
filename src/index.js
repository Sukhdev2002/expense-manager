import React from 'react';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'font-awesome/css/font-awesome.min.css';
import store from './store';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <Provider store={store}>
            <App />
</Provider>);

serviceWorker.register();
