import React, {
  createContext, memo, useRef, useCallback, useEffect, forwardRef, Children, useMemo,
} from 'react';
import PropTypes from 'prop-types';

import AXES from 'Zdog/AXES';

import isNil from 'helpers/isNil';
import isFunction from 'helpers/isFunction';
import always from 'helpers/always';

import useRequestAnimationFrame from 'Zdog/useRequestAnimationFrame';
import useComputeRotate from 'Zdog/useComputeRotate';

import { Illustration } from 'zdog';
import withParentContext from 'Zdog/Context/Parent/with';

// CONTEXT
export const IlloContext = createContext({});

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
      <svg width="1000" height="800" ref={onIlloNode} />
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
  animate, rotate, dragRotate, children, ...rest
}) => {
  const illoRef = useRef();
  const sceneCountRef = useRef(0);
  const readyCountRef = useRef(0);

  const { computeRotate } = useComputeRotate(illoRef);

  const onAnimate = useCallback(
    () => {
      const { current: illo } = illoRef;
      const { current: sceneCount } = sceneCountRef;
      const { current: readyCount } = readyCountRef;
      if (shouldAnimate(illo, Children.count(children), sceneCount, readyCount)) {
        if (isFunction(animate)) {
          animate(illo);
          return illo.updateRenderGraph();
        }
        if (!isNil(rotate)) {
          const { axis } = rotate;
          const value = computeRotate(rotate);
          illo.rotate[axis] = value;
          return illo.updateRenderGraph();
        }
        if (dragRotate) {
          return illo.updateRenderGraph();
        }
      }
      return undefined;
    },
    [children, animate, rotate, dragRotate, computeRotate],
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
  animate: PropTypes.func,
  children: PropTypes.node,
};

AnimationLayer.defaultProps = {
  rotate: null,
  dragRotate: false,
  animate: null,
  children: null,
};

export default AnimationLayer;
