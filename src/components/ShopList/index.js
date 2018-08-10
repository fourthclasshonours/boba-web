import React, { Component } from 'react';
import { getDistance } from 'geolib';
import Shop from '../Shop';

import './styles.scss';

const getShopLocation = (shop) => ({
  latitude: shop.location.LATITUDE,
  longitude: shop.location.LONGITUDE,
});

class ShopList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shops: [],
      location: null,
    };

    this.load = this.load.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({ location: position.coords });
    }, console.error);
    this.load();
  }

  async load() {
    const shops = await fetch('https://bottleneckco.github.io/boba-scraper/data.json')
      .then((r) => r.json());

    this.setState({ shops });
  }

  render() {
    const { shops, location } = this.state;
    const sortFunc = (prevShop, nextShop) => {
      if (!location) {
        return 0;
      }
      const prevShopDistance = getDistance(location, getShopLocation(prevShop));
      const nextShopDistance = getDistance(location, getShopLocation(nextShop));
      return prevShopDistance - nextShopDistance;
    };
    return (
      <div className="shop-list">
        {
          shops.sort(sortFunc).map((shop) => (
            <Shop shop={shop} key={shop.address} distance={location ? getDistance(location, getShopLocation(shop)) : null} />
          ))
        }
      </div>
    );
  }
}

export default ShopList;
