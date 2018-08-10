import React, { Component } from 'react';

class ShopList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shops: []
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
    return (
      <div>
        {
          this.state.shops.map((shop) => (
            <span>{JSON.stringify(shop)}</span>
          ))
        }
      </div>
    );
  }
}

export default ShopList;
