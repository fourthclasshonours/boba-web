import PropTypes from 'prop-types';

export default PropTypes.shape({
  title: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  chain: PropTypes.string.isRequired,
  phone: PropTypes.string,
  opening_hours: PropTypes.string,
  location: PropTypes.shape({
    SEARCHVAL: PropTypes.string,
    LATITUDE: PropTypes.string,
    LONGITUDE: PropTypes.string,
  }).isRequired,
});
