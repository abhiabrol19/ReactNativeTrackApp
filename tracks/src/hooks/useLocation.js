import { useState, useEffect, useRef } from 'react';
import {
  Accuracy,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
} from 'expo-location';

export default (isTracking, callback) => {
  const [err, setErr] = useState(null);
  const subscriberRef = useRef(null);

  const startTracking = async () => {
    try {
      const { granted } = await requestForegroundPermissionsAsync();
      if (!granted) {
        setErr('Permission to access location was denied');
        return;
      }

      if (subscriberRef.current) {
        // If there's already an active subscription, remove it
        subscriberRef.current.remove();
      }

      console.log('Starting tracking');

      subscriberRef.current = await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10,
        },
        callback
      );
    } catch (e) {
      setErr(e.message || e);
    }
  };

  const stopTracking = () => {
    if (subscriberRef.current) {
      console.log('Removing subscriber');
      subscriberRef.current.remove();
      subscriberRef.current = null;
    }
  };

  useEffect(() => {
    if (isTracking) {
      startTracking();
    } else {
      stopTracking();
    }

    return () => {
      stopTracking(); // Cleanup when component unmounts
    };
  }, [isTracking]);

  return [err, startTracking, stopTracking];
};
