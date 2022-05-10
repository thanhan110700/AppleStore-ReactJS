import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './index.css'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import App from './App';
import AdminPage from './Components/Admin/AdminPage'

ReactDOM.render(

    <Provider store={store}>
      <React.StrictMode>
      <Router>
        <Routes>
          
          <Route path="/*" element={<App />}/>
          <Route path='/admin' element={<AdminPage />} />         
        </Routes>
      </Router>
    </React.StrictMode>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

