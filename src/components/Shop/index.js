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
  function openMapApp(shopCoordinates) {
    const isAppleOS = navigator.platform.match(/(iPhone|iPod|iPad)/i)?true:false;

    // Open Apple Maps if OS is iOS
    if (isAppleOS) {
      return `maps:?daddr=${shopCoordinates}`;
    }

    // Open Google Maps app/web on other platforms
    return `https://www.google.com/maps/dir/?api=1&destination=${shopCoordinates}`;
  }

  const shopCoordinates = `${shop.location.LATITUDE},${shop.location.LONGITUDE}`;

  return (
    <div className="shop">
      <h2 className="shop__name">
        {formatName()}
      </h2>
      <a
        className="shop__address"
        href={openMapApp(shopCoordinates)}
        target="_system"
      >
        {shop.address}
      </a>
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
  distance: PropTypes.number,
};

export default Shop;
