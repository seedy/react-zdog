import React, {
  forwardRef, useCallback, useRef, createContext,
} from 'react';
import PropTypes from 'prop-types';

// CONTEXT
export const ParentContext = createContext({});

// HOC
const withParentContext = (Component) => {
  const Wrapper = forwardRef(({ children, ...rest }, ref) => {
    const instanceRef = useRef();

    const onMount = useCallback(
      (zdogInstance) => {
        instanceRef.current = zdogInstance;
      },
      [instanceRef],
    );

    return (
      <Component ref={ref} onMount={onMount} {...rest}>
        <ParentContext.Provider value={instanceRef}>
          {children}
        </ParentContext.Provider>
      </Component>
    );
  });

  Wrapper.propTypes = {
    children: PropTypes.node,
  };

  Wrapper.defaultProps = {
    children: null,
  };

  return Wrapper;
};

export default withParentContext;
