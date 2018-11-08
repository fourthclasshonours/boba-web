import React, { Component } from 'react';
import { getDistance } from 'geolib';
import Shop from '../Shop';

import './styles.scss';

class ShopList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shops: [],
      userLocation: null,
    };

    this.load = this.load.bind(this);
    this.sortByDist = this.sortByDist.bind(this);
    this.renderShops = this.renderShops.bind(this);

    this.getShopLocation = (shop) => ({
      latitude: Number(shop.location.LATITUDE),
      longitude: Number(shop.location.LONGITUDE),
    });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        userLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      });
    }, console.error);
    this.load();
  }

  componentDidUpdate(prevProps, prevState) {
    const { userLocation, shops } = this.state;

    if (!prevState.userLocation || prevState.shops.length === 0) {
      if (userLocation && shops.length > 0) {
        const sortedShops = shops.sort(this.sortByDist);
        this.setState({ shops: sortedShops });
      }
    }
  }

  sortByDist(prevShop, nextShop) {
    const { userLocation } = this.state;
    if (!userLocation) {
      return 0;
    }

    const prevShopDistance = getDistance(userLocation, this.getShopLocation(prevShop));
    const nextShopDistance = getDistance(userLocation, this.getShopLocation(nextShop));
    return prevShopDistance - nextShopDistance;
  }

  async load() {
    const shops = await fetch('https://bottleneckco.github.io/sg-scraper/data.json')
      .then((r) => r.json());

    this.setState({ shops: shops.filter((shop) => shop.location) });
  }

  renderShops() {
    const { shops, userLocation } = this.state;

    if (shops.length === 0) {
      return <div>Loading...</div>;
    }

    return shops.map((shop) => (
      <Shop
        shop={shop}
        key={shop.address}
        distance={userLocation ? getDistance(userLocation, this.getShopLocation(shop)) : null}
      />
    ));
  }

  render() {
    return (
      <div className="shopList">
        {this.renderShops()}
      </div>
    );
  }
}

export default ShopList;
