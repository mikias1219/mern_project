/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { fetchSongsStart, addSongStart, updateSongStart, deleteSongStart, selectSongState } from '../features/songSlice';
import { FaTrashAlt, FaEdit, FaPlay, FaPause, FaPlus } from 'react-icons/fa';
import { 
  containerStyle, searchContainer, inputStyle, filterContainer, 
  checkboxContainerStyle, checkboxStyle, songListContainer, songItem, 
  imageContainer, songImage, songDetails, songTitle, songDetail, buttonContainer, 
  buttonStyle, iconButtonStyle, playPauseButtonStyle, formStyle, inputFormStyle, 
  buttonFormStyle, customModalStyles, errorMessageStyle, successMessageStyle
} from '../sytles/style'; 

const defaultImageUrl = 'loader.svg';
const audioUrl = 'Current Info about exit.mp3';

// Define types for song and state
interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  imageUrl?: string;
  audioUrl?: string;
}

interface NewSong {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

interface SongListState {
  songs: Song[];
  loading: boolean;
  error: string | null;
  success: string | null;  
}

const SongList: React.FC = () => {
  const dispatch = useDispatch();
  const { songs = [], loading, error, success } = useSelector(selectSongState) as SongListState;
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGenres, setSelectedGenres] = useState<Record<string, boolean>>({});
  const [playing, setPlaying] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState<boolean>(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
    const [errors, setErrors] = useState<Partial<NewSong>>({});
  const [updateErrors, setUpdateErrors] = useState<Partial<Song>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [newSong, setNewSong] = useState<NewSong>({
    title: '',
    artist: '',
    album: '',
    genre: '',
  });


  useEffect(() => {
    dispatch(fetchSongsStart());
  }, [dispatch]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleAudioEnded);
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('ended', handleAudioEnded);
        }
      };
    }
  }, [currentIndex, songs]);

  useEffect(() => {
    if (success) {
      setSuccessMessage(success);
      setTimeout(() => setSuccessMessage(null), 1000);
    }
  }, [success]);

  const openModal = (song: Song) => {
    setSelectedSong(song);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedSong(null);
  };

  const openAddModal = () => {
    setAddModalIsOpen(true);
  };

  const closeAddModal = () => {
    setAddModalIsOpen(false);
    setNewSong({
      title: '',
      artist: '',
      album: '',
      genre: '',
    });
    setErrors({});
  };

  const validateSong = (song: NewSong | Song): Partial<NewSong | Song> => {
    const errors: Partial<NewSong | Song> = {};
    if (!song.title) errors.title = 'Title is required';
    if (!song.artist) errors.artist = 'Artist is required';
    if (!song.album) errors.album = 'Album is required';
    if (!song.genre) errors.genre = 'Genre is required';
    return errors;
  };

  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedSong) {
      const errors = validateSong(selectedSong);
      if (Object.keys(errors).length > 0) {
        setUpdateErrors(errors);
      } else {
        dispatch(updateSongStart(selectedSong));
        closeModal();
      }
    }
  };

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateSong(newSong);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      dispatch(addSongStart(newSong));
      closeAddModal();
    }
  };

  const handleAudioEnded = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < songs.length) {
      playSongAtIndex(nextIndex);
    } else {
      setPlaying(null);
    }
  };

  const playSongAtIndex = (index: number) => {
    const song = songs[index];
    if (song) {
      setPlaying(song._id);
      setCurrentIndex(index);
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
      }
    }
  };

  const handlePlayPause = (id: string, url: string | undefined, index: number) => {
    if (playing === id) {
      setPlaying(null);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    } else {
      playSongAtIndex(index);
    }
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenres(prevState => ({
      ...prevState,
      [genre]: !prevState[genre]
    }));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGenres({});
  };

  const handleDelete = (id: string) => {
    dispatch(deleteSongStart(id));
  };

  // Extract unique genres
  const uniqueGenres = [...new Set(songs.map(song => song.genre))];

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedGenres[song.genre] || Object.keys(selectedGenres).length === 0)
  );

  const sortedSongs = filteredSongs.sort((a, b) => {
    if (a._id === playing) return -1;
    if (b._id === playing) return 1;
    return a.title.localeCompare(b.title);
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div css={containerStyle}>
      <audio ref={audioRef} controls />
      {successMessage && <p css={successMessageStyle}>{successMessage}</p>}
      <div css={searchContainer}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          css={inputStyle}
        />
      </div>
      <div css={filterContainer}>
        {uniqueGenres.map(genre => (
          <div key={genre} css={checkboxContainerStyle}>
            <input
              type="checkbox"
              checked={!!selectedGenres[genre]}
              onChange={() => handleGenreChange(genre)}
              css={checkboxStyle}
            />
            <label>{genre}</label>
          </div>
        ))}
        <button css={buttonStyle} onClick={clearFilters}>
          Clear Filters
        </button>
      </div>
      <div css={buttonContainer}>
        <button css={buttonStyle} onClick={openAddModal}>
          <FaPlus css={iconButtonStyle} />
          Add Song
        </button>
      </div>
      <div css={songListContainer}>
        {sortedSongs.length > 0 ? (
          sortedSongs.map((song, index) => (
            <div key={song._id} css={songItem}>
              <div css={imageContainer}>
                <img
                  src={song.imageUrl || defaultImageUrl}
                  alt={song.title}
                  css={songImage}
                />
              </div>
              <div css={songDetails}>
                <div css={songTitle}>{song.title}</div>
                <div css={songDetail}>{song.artist}</div>
                <div css={songDetail}>{song.album}</div>
                <div css={songDetail}>{song.genre}</div>
              </div>
              <div css={buttonContainer}>
                <button
                  css={playPauseButtonStyle}
                  onClick={() => handlePlayPause(song._id, song.audioUrl, index)}
                >
                  {playing === song._id ? <FaPause /> : <FaPlay />}
                </button>
                <button css={buttonStyle} onClick={() => openModal(song)}>
                  <FaEdit css={iconButtonStyle} />
                  Update
                </button>
                <button css={buttonStyle} onClick={() => handleDelete(song._id)}>
                  <FaTrashAlt css={iconButtonStyle} />
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No songs available</p>
        )}
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Update Song" style={customModalStyles}>
        {selectedSong && (
          <form css={formStyle} onSubmit={handleUpdateSubmit}>
            <input
              type="text"
              value={selectedSong.title}
              onChange={(e) => setSelectedSong({ ...selectedSong, title: e.target.value })}
              placeholder="Title"
              css={inputFormStyle}
            />
            {updateErrors.title && <p css={errorMessageStyle}>{updateErrors.title}</p>}
            <input
              type="text"
              value={selectedSong.artist}
              onChange={(e) => setSelectedSong({ ...selectedSong, artist: e.target.value })}
              placeholder="Artist"
              css={inputFormStyle}
            />
            {updateErrors.artist && <p css={errorMessageStyle}>{updateErrors.artist}</p>}
            <input
              type="text"
              value={selectedSong.album}
              onChange={(e) => setSelectedSong({ ...selectedSong, album: e.target.value })}
              placeholder="Album"
              css={inputFormStyle}
            />
            {updateErrors.album && <p css={errorMessageStyle}>{updateErrors.album}</p>}
            <input
              type="text"
              value={selectedSong.genre}
              onChange={(e) => setSelectedSong({ ...selectedSong, genre: e.target.value })}
              placeholder="Genre"
              css={inputFormStyle}
            />
            {updateErrors.genre && <p css={errorMessageStyle}>{updateErrors.genre}</p>}
            <div css={buttonContainer}>
              <button type="submit" css={buttonFormStyle}>
                Update Song
              </button>
              <button type="button" onClick={closeModal} css={buttonFormStyle}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </Modal>
      <Modal isOpen={addModalIsOpen} onRequestClose={closeAddModal} contentLabel="Add Song" style={customModalStyles}>
        <form css={formStyle} onSubmit={handleAddSubmit}>
          <input
            type="text"
            value={newSong.title}
            onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
            placeholder="Title"
            css={inputFormStyle}
          />
          {errors.title && <p css={errorMessageStyle}>{errors.title}</p>}
          <input
            type="text"
            value={newSong.artist}
            onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
            placeholder="Artist"
            css={inputFormStyle}
          />
          {errors.artist && <p css={errorMessageStyle}>{errors.artist}</p>}
          <input
            type="text"
            value={newSong.album}
            onChange={(e) => setNewSong({ ...newSong, album: e.target.value })}
            placeholder="Album"
            css={inputFormStyle}
          />
          {errors.album && <p css={errorMessageStyle}>{errors.album}</p>}
          <input
            type="text"
            value={newSong.genre}
            onChange={(e) => setNewSong({ ...newSong, genre: e.target.value })}
            placeholder="Genre"
            css={inputFormStyle}
          />
          {errors.genre && <p css={errorMessageStyle}>{errors.genre}</p>}
          <div css={buttonContainer}>
            <button type="submit" css={buttonFormStyle}>
              Add Song
            </button>
            <button type="button" onClick={closeAddModal} css={buttonFormStyle}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SongList;
