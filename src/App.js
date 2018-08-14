import React from 'react';
import Header from './components/Header';
import ShopList from './components/ShopList';
import './stylesheets/styles.scss';

const App = () => (
  <div>
    <header>
      <Header />
    </header>
    <main>
      <ShopList />
    </main>
  </div>
);

export default App;
