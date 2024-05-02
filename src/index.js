import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import JobList from './pages/jobList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/jobs" element={<JobList />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
