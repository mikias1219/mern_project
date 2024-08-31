import { call, all, put, takeEvery, ForkEffect, AllEffect } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongStart,
  addSongSuccess,
  addSongFailure,
  updateSongStart,
  updateSongSuccess,
  updateSongFailure,
  deleteSongStart,
  deleteSongSuccess,
  deleteSongFailure,
  fetchStatisticsStart,
  fetchStatisticsSuccess,
  fetchStatisticsFailure,
} from '../features/songSlice';

const BASE_URL = 'http://localhost:5000/api/songs';

function* apiCall<T>(method: string, url: string, data?: unknown): Generator<any, T, any> {
  try {
    const response = yield call(axios, { method, url, data });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

// Fetch Songs
function* fetchSongsSaga(): Generator<any, void, any> {
  try {
    const data: ApiResponse<Song[]> = yield call(apiCall, 'GET', `${BASE_URL}/songs`);
    if (data.success && Array.isArray(data.data)) {
      yield put(fetchSongsSuccess(data.data));
    } else {
      yield put(fetchSongsFailure('Failed to fetch songs'));
    }
  } catch (error: any) {
    yield put(fetchSongsFailure(error.message));
  }
}

// Add Song
function* addSongSaga(action: { type: string; payload: Song }): Generator<any, void, any> {
  try {
    const data: ApiResponse<Song> = yield call(apiCall, 'POST', `${BASE_URL}/create_songs`, action.payload);
    if (data.success && data.data) {
      yield put(addSongSuccess(data.data));
    } else {
      yield put(addSongFailure('Failed to add song'));
    }
  } catch (error: any) {
    yield put(addSongFailure(error.message));
  }
}

// Update Song
function* updateSongSaga(action: { type: string; payload: Song }): Generator<any, void, any> {
  try {
    const data: ApiResponse<Song> = yield call(apiCall, 'PUT', `${BASE_URL}/songs/${action.payload._id}`, action.payload);
    if (data.success && data.data) {
      yield put(updateSongSuccess(data.data));
    } else {
      yield put(updateSongFailure('Failed to update song'));
    }
  } catch (error: any) {
    yield put(updateSongFailure(error.message));
  }
}

// Delete Song
function* deleteSongSaga(action: { type: string; payload: string }): Generator<any, void, any> {
  try {
    const data: ApiResponse<null> = yield call(apiCall, 'DELETE', `${BASE_URL}/songs/${action.payload}`);
    if (data.success) {
      yield put(deleteSongSuccess(action.payload));
    } else {
      yield put(deleteSongFailure('Failed to delete song'));
    }
  } catch (error: any) {
    yield put(deleteSongFailure(error.message));
  }
}

// Fetch Statistics
function* fetchStatisticsSaga(): Generator<any, void, any> {
  try {
    const data: ApiResponse<any> = yield call(apiCall, 'GET', `${BASE_URL}/songs/statistics`);
    if (data.success) {
      yield put(fetchStatisticsSuccess(data.data));
    } else {
      yield put(fetchStatisticsFailure('Failed to fetch statistics'));
    }
  } catch (error: any) {
    yield put(fetchStatisticsFailure(error.message));
  }
}

// Watcher Sagas
function* watchFetchSongs(): Generator<ForkEffect<void>, void, unknown> {
  yield takeEvery(fetchSongsStart.type, fetchSongsSaga);
}

function* watchAddSong(): Generator<ForkEffect<void>, void, unknown> {
  yield takeEvery(addSongStart.type, addSongSaga);
}

function* watchUpdateSong(): Generator<ForkEffect<void>, void, unknown> {
  yield takeEvery(updateSongStart.type, updateSongSaga);
}

function* watchDeleteSong(): Generator<ForkEffect<void>, void, unknown> {
  yield takeEvery(deleteSongStart.type, deleteSongSaga);
}

function* watchFetchStatistics(): Generator<ForkEffect<void>, void, unknown> {
  yield takeEvery(fetchStatisticsStart.type, fetchStatisticsSaga);
}

// Root Saga
export default function* rootSaga(): Generator<AllEffect<Generator<ForkEffect<void>, void, unknown>>, void, unknown> {
  yield all([
    watchFetchSongs(),
    watchAddSong(),
    watchUpdateSong(),
    watchDeleteSong(),
    watchFetchStatistics(),
  ]);
}
