import { useContext, useCallback, useEffect } from 'react';

import isNil from '../../helpers/isNil';

import { IlloContext } from '../Illustration';

export default () => {
  const {ref: illoRef, sceneCount, readyCount} = useContext(IlloContext);

  useEffect(
    () => {
      sceneCount.current += 1;
    },
    [sceneCount],
  );

  return useCallback(
    () => {
      const { current: illo } = illoRef;
      if (!isNil(illo)) {
        readyCount.current += 1;
      }
    },
    [illoRef, readyCount],
  );
}