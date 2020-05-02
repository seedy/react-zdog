import PropTypes from 'prop-types';

import SHAPES, { CYLINDER } from 'Zdog/SHAPES';

import withProxy from 'components/Proxy/with';
import Anchor from 'Zdog/Anchor';

const ReactCylinder = withProxy(Anchor);

ReactCylinder.propTypes = {
  shape: PropTypes.oneOf(SHAPES),
};

ReactCylinder.defaultProps = {
  shape: CYLINDER,
};

export default ReactCylinder;
