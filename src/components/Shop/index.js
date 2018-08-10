import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

import shopPropType from '../../prop-types/shop';

const Shop = ({ shop, distance }) => (
  <div className="shop">
    <div className="chain">
      <span>
        {shop.chain}
      </span>
    </div>
    <span className="title">
      {shop.title}
    </span>
    <span className="address">
      {shop.address}
    </span>
    {
      distance !== null ? (
        <span className="distance">
          {distance}
          m
        </span>
      ) : null
    }
  </div>
);

Shop.propTypes = {
  shop: shopPropType.isRequired,
  distance: PropTypes.number.isRequired,
};

export default Shop;
