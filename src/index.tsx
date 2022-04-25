import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.min.css';

import { Provider } from 'react-redux';
import store from './reducers/index';
import { ConfigProvider } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import 'antd/dist/antd.css';
import { routes } from './routes/index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfigProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            {routes.map((item) => {
              return (
                <Route
                  element={<item.component />}
                  key={item.key}
                  path={item.path}
                />
              );
            })}
          </Routes>
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
