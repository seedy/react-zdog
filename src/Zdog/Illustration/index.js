import React, {createContext, useRef, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';

import isNil from '../../helpers/isNil';

import {Illustration} from 'zdog';

import withParentContext from '../Context/Parent/with';

export const IlloContext = createContext({});

// CONTEXT
const ReactIllustration = ({children, dragRotate, onMount, ...props}) => {
  const illoRef = useRef();

  const onIlloNode = useCallback(
    (node) => {
      if (!isNil(node)) {
        illoRef.current = new Illustration({
          element: node,
          dragRotate,
          ...props,
        });
        onMount(illoRef.current);
      }
    },
    [dragRotate, onMount, props],
  );

  const animate = useCallback(
    () => {
      const { current: illo } = illoRef;
      if (!isNil(illo)) {
        illo.updateRenderGraph();
        if (dragRotate) {
          requestAnimationFrame(animate);
        }
      }
    },
    [dragRotate],
  );

  useEffect(
    () => {
      animate();
    },
    [animate],
  );

  return (
    <IlloContext.Provider value={illoRef}>
      <svg width="500" height="500" ref={onIlloNode} />
      {children}
    </IlloContext.Provider>
  )

}

ReactIllustration.propTypes = {
  children: PropTypes.node,
  dragRotate: PropTypes.bool,
  // withParentContext
  onMount: PropTypes.func.isRequired,
};

ReactIllustration.defaultProps = {
  children: null,
  dragRotate: false,
};

export default withParentContext(ReactIllustration);