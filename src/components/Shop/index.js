import React from 'react';

import './styles.scss';

import shopPropType from '../../prop-types/shop';

const Shop = ({ shop }) => (
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
  </div>
);

Shop.propTypes = {
  shop: shopPropType.isRequired,
};

export default Shop;
