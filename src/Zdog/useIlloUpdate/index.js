import { useContext, useCallback } from 'react';

import isNil from '../../helpers/isNil';

import { IlloContext } from '../Illustration';

export default () => {
  const illoRef = useContext(IlloContext);

  return useCallback(
    () => {
      const { current: illo } = illoRef;
      if (!isNil(illo)) {
        illo.updateRenderGraph();
      }
    },
    [illoRef],
  );
}