import { useRef, useCallback } from 'react';

import { easeInOut } from 'zdog';
import pathOr from 'helpers/pathOr';
import isNil from 'helpers/isNil';

// CONSTANTS
const INITIAL_ROTATE = { x: 0, y: 0, z: 0 };
const CYCLES = 150;

// HELPERS
const getPrevRotate = pathOr(INITIAL_ROTATE, ['current', 'rotate']);

// HOOKS
export default (illoRef) => {
  const tickerRef = useRef(0);

  const computeRotate = useCallback(
    ({ axis, value, easingAngle }, illo = illoRef) => {
      const { [axis]: prevRotate } = getPrevRotate(illo);
      if (!isNil(value)) {
        return prevRotate + value;
      }
      if (!isNil(easingAngle)) {
        const progress = tickerRef.current / CYCLES;
        const easing = easeInOut(progress % 1);
        tickerRef.current += 1;
        return easing * easingAngle;
      }
      return prevRotate;
    },
    [tickerRef, illoRef],
  );

  return { tickerRef, computeRotate };
};
