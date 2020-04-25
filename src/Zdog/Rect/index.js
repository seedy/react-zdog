import PropTypes from 'prop-types';

import SHAPES, { RECT } from '../SHAPES';

import withProxy from '../../components/Proxy/with';
import Anchor from '../Anchor';

const ReactRect = withProxy(Anchor);

ReactRect.propTypes = {
  shape: PropTypes.oneOf(SHAPES),
};

ReactRect.defaultProps = {
  shape: RECT,
};

export default ReactRect;