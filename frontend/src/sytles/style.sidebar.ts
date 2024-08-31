/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const sidebarStyle = css`
  width: 300px;
  background-color: #1a1a1a;
  color: #e0e0e0;
  padding: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  transition: transform 0.3s ease, width 0.3s ease;

  @media (max-width: 1024px) {
    width: 250px;
    background: #f5f5f5;
  }

  @media (max-width: 768px) {
    transform: translateX(-100%);
    &.open {
      transform: translateX(0);
    }
  }
`;

export const logoStyle = css`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 20px;
  box-shadow: 0 4px 8px rgba(199, 7, 7, 0.4);
`;

export const statisticsContainerStyle = css`
  flex: 1;
  overflow-y: auto;
`;

export const sectionStyle = css`
  margin-bottom: 30px;
`;

export const sectionTitleStyle = css`
  font-size: 18px;
  font-weight: 600;
  color: #f1c40f;
  margin-bottom: 15px;
`;

export const itemStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #2c3e50;
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #34495e;
  }
`;

export const detailSectionStyle = css`
  margin-top: 30px;
  padding-top: 10px;
  border-top: 1px solid #34495e;
`;

export const songListStyle = css`
  margin-top: 10px;
  list-style: none;
  padding: 0;
`;

export const songItemStyle = css`
  padding: 10px;
  background-color: #2c3e50;
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;

  &:hover {
    background-color: #34495e;
  }
`;

export const toggleButtonStyle = css`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 10px;
    left: 10px;
    background-color: #1a1a1a;
    color: #e0e0e0;
    border: none;
    padding: 10px;
    cursor: pointer;
    z-index: 1000;
    border-radius: 5px;
  }
`;
export const homeButtonStyle = css`
  position: absolute; 
  top: 10px; 
  left: 10px; 
  background: none;
  border: none;
  cursor: pointer;
  color: #fff; 
  font-size: 24px; 
  &:hover {
    color: #007bff; 
  }
`;