import React, {
  createContext, memo, useRef, useCallback, useEffect, forwardRef, Children, useMemo,
} from 'react';
import PropTypes from 'prop-types';

import AXES from 'Zdog/AXES';

import isNil from 'helpers/isNil';
import always from 'helpers/always';

import useRequestAnimationFrame from 'Zdog/useRequestAnimationFrame';

import { Illustration, easeInOut } from 'zdog';

import withParentContext from 'Zdog/Context/Parent/with';

// CONTEXT
export const IlloContext = createContext({});

// CONSTANTS
const CYCLES = 150;
let TICKER = 0;

// HELPERS
const computeRotate = (prevRotate, { value, easingAngle }) => {
  if (!isNil(value)) {
    return prevRotate + value;
  }
  if (!isNil(easingAngle)) {
    const progress = TICKER / CYCLES;
    const easing = easeInOut(progress % 1);
    TICKER += 1;
    return easing * easingAngle;
  }
  return null;
};

const shouldAnimate = (illo, childrenCount, sceneCount, readyCount) => !isNil(illo)
&& (childrenCount === 0 || (childrenCount > 0 && sceneCount > 0 && sceneCount === readyCount));

// COMPONENTS
let ReactIllustration = ({
  children, dragRotate, onMount, sceneCount, readyCount, ...props
}, ref) => {
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
  sceneCount: PropTypes.shape({ current: PropTypes.number }).isRequired,
  readyCount: PropTypes.shape({ current: PropTypes.number }).isRequired,
  // withParentContext
  onMount: PropTypes.func.isRequired,
};
ReactIllustration.defaultProps = {
  children: null,
  dragRotate: false,
};

ReactIllustration = withParentContext(ReactIllustration);
ReactIllustration = memo(ReactIllustration, always(true));

const AnimationLayer = ({
  rotate, dragRotate, children, ...rest
}) => {
  const illoRef = useRef();
  const sceneCountRef = useRef(0);
  const readyCountRef = useRef(0);

  const onAnimate = useCallback(
    () => {
      const { current: illo } = illoRef;
      const { current: sceneCount } = sceneCountRef;
      const { current: readyCount } = readyCountRef;
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
      return undefined;
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
      {...rest}
    >
      {children}
    </ReactIllustration>
  );
};

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
  children: PropTypes.node,
};

AnimationLayer.defaultProps = {
  rotate: null,
  dragRotate: false,
  children: null,
};

export default AnimationLayer;
