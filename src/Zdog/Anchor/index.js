import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import SHAPES from '../SHAPES';

import isNil from '../../helpers/isNil';

import useAddTo from '../useAddTo';
import useIlloUpdate from '../useIlloUpdate';

import withParentContext from '../Context/Parent/with';

import Zdog from 'zdog';

// COMPONENTS
const ReactAnchor = ({ onMount, children, shape, ...props }) => {
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
      illoUpdate();
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