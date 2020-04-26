import React, {createContext, memo, useRef, useCallback, useEffect, forwardRef} from 'react';
import PropTypes from 'prop-types';

import AXES from '../AXES';

import isNil from '../../helpers/isNil';
import always from '../../helpers/always';

import useRequestAnimationFrame from '../useRequestAnimationFrame';

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

// COMPONENTS
let ReactIllustration = ({children, dragRotate, onMount, ...props}, ref) => {
  const onIlloNode = useCallback(
    (node) => {
      if (!isNil(node)) {
        ref.current = new Illustration({
          element: node,
          dragRotate,
          ...props,
        });
        onMount(ref.current);
      }
    },
    [dragRotate, onMount, props, ref],
  );

  return (
    <IlloContext.Provider value={ref}>
      <svg width="500" height="500" ref={onIlloNode} />
      {children}
    </IlloContext.Provider>
  );

};

ReactIllustration = forwardRef(ReactIllustration);

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

ReactIllustration = withParentContext(ReactIllustration);
ReactIllustration = memo(ReactIllustration, always(true));

const AnimationLayer = ({ rotate, dragRotate, ...rest }) => {
  const illoRef = useRef();

  const onAnimate = useCallback(
    () => {
      const { current: illo } = illoRef;
      if (!isNil(illo)) {
        if (!isNil(rotate)) {
          const { axis } = rotate;
          const value = computeRotate(illo.rotate[axis], rotate);
          illo.rotate[axis] = value;
          return illo.updateRenderGraph();
        }
        if (dragRotate) {
          return illo.updateRenderGraph();
        }
      }
    },
    [dragRotate, rotate],
  );

  useRequestAnimationFrame(onAnimate);

  useEffect(
    () => {
      onAnimate();
    },
    [onAnimate],
  );

  return <ReactIllustration ref={illoRef} dragRotate={dragRotate} {...rest} />;
}

AnimationLayer.propTypes = {
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
  dragRotate: PropTypes.bool,
};

AnimationLayer.defaultProps = {
  rotate: null,
  dragRotate: false,
};

export default AnimationLayer;