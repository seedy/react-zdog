import React, {useCallback, useRef, createContext} from 'react';
import PropTypes from 'prop-types';

// CONTEXT
export const ParentContext = createContext({});

// HOC
const withParentContext = (Component) => {
  const Wrapper = ({children, ...rest}) => {
    const ref = useRef();

    const onMount = useCallback(
      (zdogInstance) => {
        ref.current = zdogInstance;
      },
      [ref],
    );
    
    return (
    <Component onMount={onMount} {...rest}>
      <ParentContext.Provider value={ref}>
        {children}
      </ParentContext.Provider>
    </Component>
    );
  }

  Wrapper.propTypes = {
    children: PropTypes.node,
  }

  Wrapper.defaultProps = {
    children: null,
  };

  return Wrapper;
}

export default withParentContext;