/** @jsxImportSource @emotion/react */
import React from 'react';
import Sidebar from './Sidebar';
import SongList from './SongList';
import { css } from '@emotion/react';
import { Route, Routes } from 'react-router-dom';

const dashboardContainer = css`
  display: flex;
  min-height: 100vh;
  background-color: #fff;
  @media (max-width: 768px) {
    margin-left: 0; 
  }
`;

const mainContent = css`
  display: flex;
  flex: 1;
  margin-left: 250px;
  padding: 20px;
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0; 
  }
`;

const contentContainer = css`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
`;

const songListSectionStyle = css`
  flex: 1;
  background-color: #fff;
  padding: 20px;

  @media (max-width: 768px) {
    width: 100%; 
  }
`;

const Dashboard: React.FC = () => {
  return (
    <div css={dashboardContainer}>
      <Sidebar />
      <div css={mainContent}>
        <Routes>
          <Route path="/" element={
            <div css={contentContainer}>
              <section css={songListSectionStyle}>
                <SongList />
              </section>
            </div>
          } />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
