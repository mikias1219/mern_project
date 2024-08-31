/** @jsxImportSource @emotion/react */
import React, { FC } from 'react'; 
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './components/Dashboard';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const App: FC = () => {

  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </main>
    </>
  );
};

const AppWrapper: FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
