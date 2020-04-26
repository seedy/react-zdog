import React, {createContext, useRef, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';

import AXES from '../AXES';

import isNil from '../../helpers/isNil';

import {Illustration, easeInOut} from 'zdog';

import withParentContext from '../Context/Parent/with';

export const IlloContext = createContext({});

// CONSTANTS
const CYCLES = 150;
let TICKER = 0;

// HELPERS
const computeRotate = (prevRotate, {value, easingAngle}) => {
  if (!isNil(value)) {
    return prevRotate + value;
  }
  if (!isNil(easingAngle)) {
    const progress = TICKER / CYCLES;
    const easing = easeInOut(progress % 1);
    TICKER++;
    return easing * easingAngle;
  }
}

// CONTEXT
const ReactIllustration = ({children, dragRotate, rotate, onMount, ...props}) => {
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
        if (!isNil(rotate)) {
          const {axis} = rotate;
          const value = computeRotate(illo.rotate[axis], rotate);
          illo.rotate[axis] = value;
          return requestAnimationFrame(animate);
        } 
        if (dragRotate) {
          return requestAnimationFrame(animate);
        }
      }
    },
    [dragRotate, rotate],
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
  rotate: PropTypes.oneOfType([
    PropTypes.shape({
      axis: PropTypes.oneOf(AXES).isRequired,
      value: PropTypes.number.isRequired,
    }),
    PropTypes.shape({
      axis: PropTypes.oneOf(AXES).isRequired,
      easingAngle: PropTypes.number.isRequired,
    }),
  ]),
  // withParentContext
  onMount: PropTypes.func.isRequired,
};

ReactIllustration.defaultProps = {
  children: null,
  rotate: null,
  dragRotate: false,
};

export default withParentContext(ReactIllustration);