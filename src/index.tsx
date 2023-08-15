import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import './i18n';
import Preloader from './landing/components/Preloader/Preloader';
import { store } from './redux/store';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <Suspense fallback={<Preloader/>}>
                    <App/>
                </Suspense>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
