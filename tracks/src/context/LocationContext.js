import createDataContext from './createDataContext';

const locationReducer = (state, action) => {
  switch (action.type) {
    case 'stop_recording':
      return { ...state, recording: false };
    case 'start_recording':
      return { ...state, recording: true };
    case 'add_current_location':
      return { ...state, currentLocation: action.payload };
    case 'add_location':
      return { ...state, locations: [...state.locations, action.payload] };
    case 'change_name':
      return { ...state, name: action.payload };
    case 'clear_locations':
      return { ...state, locations: [] };
    default:
      return state;
  }
};

const clearTrackData = (dispatch) => () => {
  dispatch({ type: 'clear_locations' });
  dispatch({ type: 'change_name', payload: '' });
};

const changeName = (dispatch) => (name) => {
  dispatch({ type: 'change_name', payload: name });
};

const startRecording = (dispatch) => () => {
  dispatch({ type: 'start_recording' });
};

const stopRecording = (dispatch) => () => {
  dispatch({ type: 'stop_recording' });
};

const addLocation = (dispatch) => (location, recording) => {
  if (recording) {
    console.log('Recording and adding location:', location); // Only log when adding to the list
    dispatch({ type: 'add_location', payload: location });
  }
  dispatch({ type: 'add_current_location', payload: location }); // Keeps current location updated
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  { startRecording, stopRecording, addLocation, changeName, clearTrackData },
  { recording: false, locations: [], currentLocation: null, name: '' }
);
