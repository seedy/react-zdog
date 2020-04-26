import PropTypes from 'prop-types';

import SHAPES, { GROUP } from '../SHAPES';

import withProxy from '../../components/Proxy/with';
import Anchor from '../Anchor';

const ReactGroup = withProxy(Anchor);

ReactGroup.propTypes = {
  shape: PropTypes.oneOf(SHAPES),
};

ReactGroup.defaultProps = {
  shape: GROUP,
};

export default ReactGroup;