/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';

// Common Colors
const colors = {
  primary: '#3498db',
  secondary: '#110341',
  hover: '#14191d',
  accent: '#750344',
  textLight: '#fff',
  textDark: '#000',
  border: '#ddd',
  backgroundLight: '#f5f5f5',
  backgroundDark: '#0b0109',
  backgroundHover: '#1c1c1c',
  inputBackground: '#fff',
};

// Common Styles
const commonStyles = {
  transition: '0.3s ease',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
};

// Container Styles
export const containerStyle = css`
  padding: 20px;
  max-width: 500px; 
  margin: 0 auto;
  border-radius: ${commonStyles.borderRadius};
  background: ${colors.backgroundLight};

  @media (max-width: 768px) {
    padding: 1px;
    width: 100%;
  }
`;

// Search Styles
export const searchContainer = css`
  position: relative;
  margin-bottom: 10px;
  width: 100%; 
  max-width: 300px; 
  padding: 0 10px; 

  @media (max-width: 768px) {
    display: none;
  }
`;

export const inputStyle = css`
  width: 100%;
  padding: 10px 40px;
  border: 1px solid ${colors.border};
  border-radius: 5px;
  box-shadow: ${commonStyles.boxShadow};
  font-size: 16px;
  transition: border-color ${commonStyles.transition};
  background: ${colors.inputBackground};
  
  &:focus {
    border-color: ${colors.primary};
    outline: none;
  }
`;

export const iconStyle = css`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  color: #034348;
  font-size: 20px;
  z-index: 1;
`;

// Filter Styles
export const filterContainer = css`
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center; 

  @media (max-width: 768px) {
    display: none;
  }
`;

export const checkboxContainerStyle = css`
  display: flex;
  align-items: center;
  font-size: 16px;
  gap: 8px;
  color: ${colors.textDark};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const checkboxStyle = css`
  accent-color: ${colors.primary};
  cursor: pointer;
  transform: scale(1.2);
`;

// Song List Styles
export const songListContainer = css`
  max-height: 500px; 
  overflow-y: auto;
  margin-top: 10px;
  border-top: 1px solid ${colors.border};
`;

export const songItem = css`
  padding: 15px;
  border-bottom: 1px solid #ecf0f1;
  border-radius: ${commonStyles.borderRadius};
  background-color: ${colors.backgroundDark};
  box-shadow: ${commonStyles.boxShadow};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 15px;
  transition: background-color ${commonStyles.transition};
  
  &:hover {
    background-color: ${colors.backgroundHover};
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const imageContainer = css`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

export const songImage = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const songDetails = css`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const songTitle = css`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.textLight};
  margin-bottom: 5px;
`;

export const songDetail = css`
  font-size: 16px;
  color: #7f8c8d;
`;

export const buttonContainer = css`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const buttonStyle = css`
  background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
  border: none;
  color: ${colors.textLight};
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background ${commonStyles.transition}, transform ${commonStyles.transition}, box-shadow ${commonStyles.transition};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: linear-gradient(135deg, ${colors.hover}, ${colors.accent});
    transform: scale(1.05);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(${colors.primary}, 0.5);
  }
  @media (max-width: 768px) {
    padding: 12px 25px;
    font-size: 1rem;
  }
  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 0.875rem;
  }
`;

export const iconButtonStyle = css`
  font-size: 14px;
`;

export const playPauseButtonStyle = css`
  background: none;
  border: none;
  color: ${colors.primary};
  font-size: 20px;
  cursor: pointer;
  transition: color ${commonStyles.transition};
  
  &:hover {
    color: #2c3e50;
  }
`;

// Form Styles
export const formStyle = css`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background-color: 'rgba(30, 4, 41, 0.75)';
  border-radius: ${commonStyles.borderRadius};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const inputFormStyle = css`
  margin: 10px 0;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color ${commonStyles.transition};

  &:focus {
    border-color: hotpink;
    outline: none;
  }
`;
export const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

export const buttonFormStyle = css`
  background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
  border: none;
  color: ${colors.textLight};
  padding: 14px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background ${commonStyles.transition}, transform ${commonStyles.transition}, box-shadow ${commonStyles.transition};
  animation: ${pulse} 1.5s infinite;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: linear-gradient(135deg, ${colors.hover}, ${colors.accent});
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(${colors.primary}, 0.5);
  }
`;

// Modal Styles
export const customModalStyles = {
  overlay: {
    backgroundColor: 'rgba(30, 4, 41, 0.75)',
  },
  content: {
    backgroundColor: 'rgba(30, 4, 41, 0.75)', 
    borderRadius: '8px',
    padding: '20px',
    border: 'none',
    maxWidth: '500px',
    margin: 'auto',
  },
};


export const errorMessageStyle = css`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;



export const successMessageStyle = css`
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  padding: 10px;
  margin: 10px 0;
  font-weight: bold;
  text-align: center;
  font-size: 16px;
  
  /* Responsive Styles */
  @media (max-width: 600px) {
    font-size: 14px;
    padding: 8px;
  }

  @media (max-width: 400px) {
    font-size: 12px;
    padding: 6px;
    margin: 8px 0;
  }
`;