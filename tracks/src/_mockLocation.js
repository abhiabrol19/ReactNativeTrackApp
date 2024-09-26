import * as Location from 'expo-location';

const tenMetersWithDegrees = 0.0001;

const getLocation = (increment) => {
  return {
    timestamp: 10000000,
    coords: {
      speed: 0,
      heading: 0,
      accuracy: 5,
      altitudeAccuracy: 5,
      altitude: 5,
      latitude: -37.85713003075586 + increment * tenMetersWithDegrees,
      longitude: 145.28372033662055 + increment * tenMetersWithDegrees,
    },
  };
};

let counter = 0;
setInterval(() => {
  //const location = getLocation(counter);
  //console.log('Mock location:', location);
  Location.EventEmitter.emit('Expo.locationChanged', {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter),
  });
  counter++;
}, 1000);
