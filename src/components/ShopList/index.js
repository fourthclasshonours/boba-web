import React, { Component } from 'react';
import Shop from '../Shop';

import './styles.scss';

class ShopList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shops: [],
    };

    this.load = this.load.bind(this);
  }

  componentDidMount() {
    this.load();
  }

  async load() {
    const shops = await fetch('https://bottleneckco.github.io/boba-scraper/data.json')
      .then((r) => r.json());

    this.setState({ shops });
  }

  render() {
    const { shops } = this.state;
    return (
      <div className="shop-list">
        {
          shops.map((shop) => (
            <Shop shop={shop} key={shop.address} />
          ))
        }
      </div>
    );
  }
}

export default ShopList;
