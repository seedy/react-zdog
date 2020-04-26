import React, {createContext, memo, useRef, useCallback, useEffect, forwardRef, Children, useMemo} from 'react';
import PropTypes from 'prop-types';

import AXES from '../AXES';

import isNil from '../../helpers/isNil';
import always from '../../helpers/always';

import useRequestAnimationFrame from '../useRequestAnimationFrame';

import {Illustration, easeInOut} from 'zdog';

import withParentContext from '../Context/Parent/with';

// CONTEXT
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
};

const shouldAnimate = (illo, childrenCount, sceneCount, readyCount) => !isNil(illo) 
&& (childrenCount === 0 ||  (childrenCount > 0 && sceneCount > 0 && sceneCount === readyCount))

// COMPONENTS
let ReactIllustration = ({children, dragRotate, onMount, sceneCount, readyCount, ...props}, ref) => {

  const contextValue = useMemo(
    () => ({
      ref,
      sceneCount,
      readyCount,
    }),
    [ref, sceneCount, readyCount],
  );

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
    <IlloContext.Provider value={contextValue}>
      <svg width="800" height="800" ref={onIlloNode} />
      {children}
    </IlloContext.Provider>
  );

};

ReactIllustration = forwardRef(ReactIllustration);

ReactIllustration.propTypes = {
  children: PropTypes.node,
  dragRotate: PropTypes.bool,
  // useful for animation
  sceneCount: PropTypes.shape({current: PropTypes.number}),
  readyCount: PropTypes.shape({current: PropTypes.number}),
  // withParentContext
  onMount: PropTypes.func.isRequired,
};
ReactIllustration.defaultProps = {
  children: null,
  dragRotate: false,
};

ReactIllustration = withParentContext(ReactIllustration);
ReactIllustration = memo(ReactIllustration, always(true));

const AnimationLayer = ({ rotate, dragRotate, children, ...rest }) => {
  const illoRef = useRef();
  const sceneCountRef = useRef(0);
  const readyCountRef = useRef(0);

  const onAnimate = useCallback(
    () => {
      const { current: illo } = illoRef;
      const {current: sceneCount} = sceneCountRef;
      const {current: readyCount} = readyCountRef;
      if (shouldAnimate(illo, Children.count(children), sceneCount, readyCount)) {
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
    [children, rotate, dragRotate],
  );

  useRequestAnimationFrame(onAnimate);

  useEffect(
    () => {
      onAnimate();
    },
    [onAnimate],
  );

  return (
    <ReactIllustration 
      ref={illoRef} 
      sceneCount={sceneCountRef} 
      readyCount={readyCountRef} 
      dragRotate={dragRotate} 
      children={children} 
      {...rest} 
    />
  );
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