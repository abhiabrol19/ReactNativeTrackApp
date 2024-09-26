import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const trackReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_tracks':
      return { ...state, tracks: action.payload };
    case 'create_track':
      return { ...state, tracks: [...state.tracks, action.payload] };
    case 'delete_track':
      return {
        ...state,
        tracks: state.tracks.filter((track) => track._id !== action.payload),
      };
    default:
      return state;
  }
};

const fetchTracks = (dispatch) => async () => {
  try {
    const response = await trackerApi.get('/tracks'); // Fetch tracks from server
    dispatch({ type: 'fetch_tracks', payload: response.data });
  } catch (error) {
    console.error('Error fetching tracks:', error);
  }
};

const createTrack = (dispatch) => async (name, locations) => {
  try {
    const response = await trackerApi.post('/tracks', { name, locations }); // Save track to server
    dispatch({ type: 'create_track', payload: response.data });
  } catch (error) {
    console.error('Error saving track:', error);
  }
};

const deleteTrack = (dispatch) => async (id) => {
  try {
    await trackerApi.delete(`/tracks/${id}`);
    dispatch({ type: 'delete_track', payload: id });
  } catch (error) {
    console.error('Error deleting track:', error);
  }
};

export const { Context, Provider } = createDataContext(
  trackReducer,
  { fetchTracks, createTrack, deleteTrack },
  { tracks: [] }
);
