import PropTypes from 'prop-types';

import SHAPES, { HEMISPHERE } from 'Zdog/SHAPES';

import withProxy from 'components/Proxy/with';
import Anchor from 'Zdog/Anchor';

const ReactHemisphere = withProxy(Anchor);

ReactHemisphere.propTypes = {
  shape: PropTypes.oneOf(SHAPES),
};

ReactHemisphere.defaultProps = {
  shape: HEMISPHERE,
};

export default ReactHemisphere;
