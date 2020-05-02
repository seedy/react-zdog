import PropTypes from 'prop-types';

import SHAPES, { GROUP } from 'Zdog/SHAPES';

import withProxy from 'components/Proxy/with';
import Anchor from 'Zdog/Anchor';

const ReactGroup = withProxy(Anchor);

ReactGroup.propTypes = {
  shape: PropTypes.oneOf(SHAPES),
};

ReactGroup.defaultProps = {
  shape: GROUP,
};

export default ReactGroup;
