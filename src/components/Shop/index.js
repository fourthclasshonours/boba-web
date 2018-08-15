import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

import shopPropType from '../../prop-types/shop';

const Shop = ({ shop, distance }) => {
  const formatName = () => {
    const { chain, title } = shop;

    if (title.includes('@')) {
      return title;
    }

    return `${chain} @ ${title}`;
  };

  return (
    <div className="shop">
      <h2 className="shop__name">
        {formatName()}
      </h2>
      <p className="shop__address">
        {shop.address}
      </p>
      {
        distance !== null ? (
          <p className="shop__distance">
            {distance} m
          </p>
        ) : null
      }
    </div>
  );
}

Shop.propTypes = {
  shop: shopPropType.isRequired,
  distance: PropTypes.number.isRequired,
};

export default Shop;
