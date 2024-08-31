import { all } from 'redux-saga/effects';
import watchFetchSongs from './songSaga';

export default function* rootSaga() {
  yield all([
    watchFetchSongs(),
  ]);
}
