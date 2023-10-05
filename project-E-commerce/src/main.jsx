import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './redux/store/store.jsx';
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import './index.css'
// https://devpress.csdn.net/react/62ec1f6789d9027116a1036b.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <React.StrictMode>
    <Provider store={store}>
      <App /> 
    </Provider>
  </React.StrictMode>
  </BrowserRouter>
)
