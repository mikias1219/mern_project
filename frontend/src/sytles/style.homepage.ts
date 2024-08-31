// styles.ts
/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
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

const backgroundTransition = keyframes`
  0% {
    background: #02433c;
  }
  25% {
    background: #2e0354;
  }
  50% {
    background: #4a148c;
  }
  75% {
    background: #100116;
  }
  100% {
    background: #02433c;
  }
`;

export const containerStyle = css`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const heroSectionStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 80px 20px;
  color: white;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  animation: ${backgroundTransition} 10s linear infinite, ${fadeIn} 1s ease-out;
  margin-bottom: 60px;
  @media (max-width: 1200px) {
    padding: 60px 15px;
  }
  @media (max-width: 768px) {
    padding: 50px 10px;
  }
  @media (max-width: 480px) {
    padding: 40px 5px;
  }
`;

export const heroTitleStyle = css`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 20px;
  animation: ${fadeIn} 1.5s ease-out;
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const heroSubtitleStyle = css`
  font-size: 1.5rem;
  margin-bottom: 40px;
  max-width: 800px;
  animation: ${fadeIn} 2s ease-out;
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;



export const messageStyle = css`
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 20px;
  max-width: 700px;
  line-height: 1.5;
  color: #e0e0e0;
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;
