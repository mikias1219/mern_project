/** @jsxImportSource @emotion/react */
import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchStatisticsStart } from '../features/songSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHome } from '@fortawesome/free-solid-svg-icons'; 
import {
  sidebarStyle,
  logoStyle,
  statisticsContainerStyle,
  sectionStyle,
  sectionTitleStyle,
  itemStyle,
  detailSectionStyle,
  songListStyle,
  songItemStyle,
  toggleButtonStyle,
  homeButtonStyle, 
} from '../sytles/style.sidebar';
import { useNavigate } from 'react-router-dom'; 

interface Song {
  _id: string;
  title: string;
  artist: string;
}

interface AlbumSongCount {
  album: string;
  count: number;
}

interface Statistics {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  albumSongCounts: AlbumSongCount[];
}

const Sidebar: FC = () => {
  const dispatch = useDispatch();
  const { statistics, loading, error, songs } = useSelector((state: RootState) => state.songs);
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const [artistSongs, setArtistSongs] = useState<Song[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    dispatch(fetchStatisticsStart());
  }, [dispatch]);

  useEffect(() => {
    if (selectedArtist) {
      const filteredSongs = songs.filter(song => song.artist === selectedArtist);
      setArtistSongs(filteredSongs);
    }
  }, [selectedArtist, songs]);

  const getUniqueKey = (prefix: string, index: number) => `${prefix}-${index}`;

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleHomeClick = () => {
    navigate('/'); 
  };

  return (
    <>
      <button css={toggleButtonStyle} onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>
      <div css={sidebarStyle} className={isOpen ? 'open' : ''}>
        <img src="loader.svg" alt="Logo" css={logoStyle} />
        <button css={homeButtonStyle} onClick={handleHomeClick}>
          <FontAwesomeIcon icon={faHome} />
        </button>
        <div css={statisticsContainerStyle}>
          <h3 css={sectionTitleStyle}>Statistics</h3>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : statistics ? (
            <div>
              <div css={sectionStyle}>
                <h4 css={sectionTitleStyle}>General</h4>
                <div css={itemStyle}>
                  <span>Total Songs:</span>
                  <span>{statistics.totalSongs}</span>
                </div>
                <div css={itemStyle}>
                  <span>Total Artists:</span>
                  <span>{statistics.totalArtists}</span>
                </div>
                <div css={itemStyle}>
                  <span>Total Albums:</span>
                  <span>{statistics.totalAlbums}</span>
                </div>
                <div css={itemStyle}>
                  <span>Total Genres:</span>
                  <span>{statistics.totalGenres}</span>
                </div>
              </div>
              <div css={sectionStyle}>
                <h4 css={sectionTitleStyle}>Albums</h4>
                {statistics.albumSongCounts.map((album, index) => (
                  <div css={itemStyle} key={getUniqueKey('album', index)}>
                    <span>{album.album}</span>
                    <span>{album.count}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>No statistics available.</p>
          )}
          {selectedArtist && (
            <div css={detailSectionStyle}>
              <h4 css={sectionTitleStyle}>Songs by {selectedArtist}</h4>
              <ul css={songListStyle}>
                {artistSongs.length > 0 ? (
                  artistSongs.map(song => (
                    <li css={songItemStyle} key={song._id}>
                      <span>{song.title}</span>
                    </li>
                  ))
                ) : (
                  <p>No songs found for this artist.</p>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
