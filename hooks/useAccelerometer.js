import { useEffect, useRef, useState } from 'react';
import { Accelerometer } from 'expo-sensors';

/*
  Returns:
  {
    movementState,
    stationarySeconds,
    reset
  }
*/

export default function useAccelerometer(active = false) {
  const [movementState, setMovementState] = useState('Idle');
  const [stationarySeconds, setStationarySeconds] = useState(0);

  const last = useRef({ x: 0, y: 0, z: 0 });
  const subscription = useRef(null);

  useEffect(() => {
    if (!active) return;

    Accelerometer.setUpdateInterval(500);

    subscription.current = Accelerometer.addListener((data) => {
      const diff =
        Math.abs(data.x - last.current.x) +
        Math.abs(data.y - last.current.y) +
        Math.abs(data.z - last.current.z);

      if (diff < 0.08) {
        setMovementState('Stationary');
        setStationarySeconds((prev) => prev + 1);
      } else {
        setMovementState('Moving');
      }

      last.current = data;
    });

    return () => {
      subscription.current && subscription.current.remove();
    };
  }, [active]);

  const reset = () => {
    setStationarySeconds(0);
    setMovementState('Idle');
    last.current = { x: 0, y: 0, z: 0 };
  };

  return {
    movementState,
    stationarySeconds,
    reset,
  };
}
