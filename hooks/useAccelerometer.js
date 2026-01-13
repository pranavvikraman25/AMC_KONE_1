import { useEffect, useRef, useState } from 'react';
import { Accelerometer } from 'expo-sensors';

/*
  Returns:
  {
    movementState,
    stationarySeconds,
    trajectory,
    currentPosition,
    reset
  }
*/

export default function useAccelerometer(active = false) {
  const [movementState, setMovementState] = useState('Idle');
  const [stationarySeconds, setStationarySeconds] = useState(0);
  const [trajectory, setTrajectory] = useState([]);

  const position = useRef({ x: 0, y: 0, z: 0 });
  const last = useRef({ x: 0, y: 0, z: 0 });
  const subscription = useRef(null);

  useEffect(() => {
    if (!active) return;

    Accelerometer.setUpdateInterval(300);

    subscription.current = Accelerometer.addListener(({ x, y, z }) => {
      const dx = x - last.current.x;
      const dy = y - last.current.y;
      const dz = z - last.current.z;

      const diff = Math.abs(dx) + Math.abs(dy) + Math.abs(dz);

      // --- MOVEMENT STATE ---
      if (diff < 0.05) {
        setMovementState('Stationary');
        setStationarySeconds((prev) => prev + 1);
      } else {
        setMovementState('Moving');

        // --- UPDATE RELATIVE POSITION ---
        position.current = {
          x: position.current.x + dx,
          y: position.current.y + dy,
          z: position.current.z + dz,
        };

        // --- SAVE TRAJECTORY POINT ---
        setTrajectory((prev) => [
          ...prev,
          {
            t: Date.now(),
            x: position.current.x,
            y: position.current.y,
            z: position.current.z,
          },
        ]);
      }

      last.current = { x, y, z };
    });

    return () => {
      subscription.current && subscription.current.remove();
    };
  }, [active]);

  const reset = () => {
    setMovementState('Idle');
    setStationarySeconds(0);
    setTrajectory([]);
    position.current = { x: 0, y: 0, z: 0 };
    last.current = { x: 0, y: 0, z: 0 };
  };

  return {
    movementState,
    stationarySeconds,
    trajectory,
    currentPosition: position.current,
    reset,
  };
}
