import PropTypes from 'prop-types';

import SHAPES, { CYLINDER } from '../SHAPES';

import withProxy from '../../components/Proxy/with';
import Anchor from '../Anchor';

const ReactCylinder = withProxy(Anchor);

ReactCylinder.propTypes = {
  shape: PropTypes.oneOf(SHAPES),
};

ReactCylinder.defaultProps = {
  shape: CYLINDER,
};

export default ReactCylinder;