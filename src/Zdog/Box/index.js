import PropTypes from 'prop-types';

import SHAPES, { BOX } from '../SHAPES';

import withProxy from '../../components/Proxy/with';
import Anchor from '../Anchor';

const ReactBox = withProxy(Anchor);

ReactBox.propTypes = {
  shape: PropTypes.oneOf(SHAPES),
};

ReactBox.defaultProps = {
  shape: BOX,
};

export default ReactBox;