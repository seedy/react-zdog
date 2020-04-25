import PropTypes from 'prop-types';

import SHAPES, { SHAPE } from '../SHAPES';

import withProxy from '../../components/Proxy/with';
import Anchor from '../Anchor';

const ReactShape = withProxy(Anchor);

ReactShape.propTypes = {
  shape: PropTypes.oneOf(SHAPES),
};

ReactShape.defaultProps = {
  shape: SHAPE,
};

export default ReactShape;