import React, { Component } from 'react';
import { getDistance } from 'geolib';
import Shop from '../Shop';

import './styles.scss';

class ShopList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shops: [],
      location: null,
    };

    this.load = this.load.bind(this);
    this.getShopLocation = (shop) => ({
      latitude: Number(shop.location.LATITUDE),
      longitude: Number(shop.location.LONGITUDE),
    });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      });
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
      const prevShopDistance = getDistance(location, this.getShopLocation(prevShop));
      const nextShopDistance = getDistance(location, this.getShopLocation(nextShop));
      return prevShopDistance - nextShopDistance;
    };
    return (
      <div className="shop-list">
        {
          shops.sort(sortFunc).map((shop) => (
            <Shop shop={shop} key={shop.address} distance={location ? getDistance(location, this.getShopLocation(shop)) : null} />
          ))
        }
      </div>
    );
  }
}

export default ShopList;
