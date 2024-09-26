import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../navigation/navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signup':
      return { errorMessage: '', token: action.payload };
    case 'signin':
      return { errorMessage: '', token: action.payload };
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    case 'signout':
      return { token: null, errorMessage: '' };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: 'signin', payload: token });
    navigate('MainFlow', {
      screen: 'TrackListFlow',
      params: { screen: 'TrackList' },
    });
  } else {
    navigate('LoginFlow', { screen: 'Signup' });
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: 'clear_error_message' });
};

const signup =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await trackerApi.post('/signup', { email, password });
      const token = response.data.token;

      await AsyncStorage.setItem('token', token);
      dispatch({ type: 'signup', payload: token });

      navigate('MainFlow', {
        screen: 'TrackListFlow',
        params: { screen: 'TrackList' },
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with sign up',
      });
    }
  };

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await trackerApi.post('/signin', { email, password });
      console.log(response.data);
      const token = response.data.token;

      await AsyncStorage.setItem('token', token);
      dispatch({ type: 'signin', payload: token });

      navigate('MainFlow', {
        screen: 'TrackListFlow',
        params: { screen: 'TrackList' },
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with sign in',
      });
    }
  };

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: 'signout' });
  navigate('LoginFlow', { screen: 'Signin' });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: '' }
);
