import PropTypes from 'prop-types';

import SHAPES, { ELLIPSE } from 'Zdog/SHAPES';

import withProxy from 'components/Proxy/with';
import Anchor from 'Zdog/Anchor';

const ReactEllipse = withProxy(Anchor);

ReactEllipse.propTypes = {
  shape: PropTypes.oneOf(SHAPES),
};

ReactEllipse.defaultProps = {
  shape: ELLIPSE,
};

export default ReactEllipse;
