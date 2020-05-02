import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import SHAPES from 'Zdog/SHAPES';

import isNil from 'helpers/isNil';

import useAddTo from 'Zdog/useAddTo';
import useIlloUpdate from 'Zdog/useIlloUpdate';

import withParentContext from 'Zdog/Context/Parent/with';

import Zdog from 'zdog';

// COMPONENTS
const ReactAnchor = ({
  onMount, children, shape, ...props
}) => {
  const parentRef = useAddTo();

  const illoUpdate = useIlloUpdate();

  const onAnchor = useCallback(
    () => {
      while (isNil(parentRef.current)) {
        return requestAnimationFrame(onAnchor);
      }
      const anchor = new Zdog[shape]({
        addTo: parentRef.current,
        ...props,
      });
      onMount(anchor);
      return illoUpdate();
    },
    [illoUpdate, onMount, parentRef, props, shape],
  );

  useEffect(
    () => {
      onAnchor();
    },
    [onAnchor],
  );

  return children;
};

ReactAnchor.propTypes = {
  shape: PropTypes.oneOf(SHAPES),
  children: PropTypes.node,
  // withParentContext
  onMount: PropTypes.func.isRequired,
};

ReactAnchor.defaultProps = {
  shape: 'Anchor',
  children: null,
};

export default withParentContext(ReactAnchor);
