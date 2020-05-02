import PropTypes from 'prop-types';


import withProxy from 'components/Proxy/with';
import Anchor from 'Zdog/Anchor';
import SHAPES, { BOX } from '../SHAPES';

const ReactBox = withProxy(Anchor);

ReactBox.propTypes = {
  shape: PropTypes.oneOf(SHAPES),
};

ReactBox.defaultProps = {
  shape: BOX,
};

export default ReactBox;
