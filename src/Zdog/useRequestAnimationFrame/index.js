import { useRef, useCallback, useEffect } from 'react';

export default (callback) => {
  const requestRef = useRef();

  const animate = useCallback(
    (time) => {
      callback(time);
      requestRef.current = requestAnimationFrame(animate);
    },
    [callback],
  );

  useEffect(
    () => {
      requestRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(requestRef.current);
    },
    [requestRef, animate],
  );
};
