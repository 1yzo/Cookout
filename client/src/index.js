import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './store/configureStore';
// import AppRouter from './routers/AppRouter';
import App from './components/App';
import { startSetUser } from './actions/user';

import 'normalize.css/normalize.css';
import './styles/base.css';

const { store, persistor } = configureStore();

const jsx = (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();

