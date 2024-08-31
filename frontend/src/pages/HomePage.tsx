/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { buttonFormStyle } from 'sytles/style'; 
import {  containerStyle,
  heroSectionStyle,
  heroTitleStyle,
  heroSubtitleStyle,
  messageStyle,} from 'sytles/style.homepage';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/dashboard');
  };

  return (
    <div css={containerStyle}>
      <section css={heroSectionStyle}>
        <h1 css={heroTitleStyle}>Welcome to MusicApp</h1>
        <p css={heroSubtitleStyle}>Discover your favorite songs, albums, and artists all in one place.</p>
        <button css={buttonFormStyle} onClick={handleButtonClick}>
          Get Test Project Here
        </button>
        <p css={messageStyle}>
          I am currently working on this project as a test project to secure a position at Addis Software PLC. 
          My goal is to demonstrate my skills and commitment to potential employers. Thank you for taking the time to review my work!
        </p>
      </section>
    </div>
  );
};

export default HomePage;
