import Head from 'next/head';
import React, { useState } from 'react';

import Filters from '../components/Filters';
import Header from '../components/Header';
import ShopList from '../components/ShopList';

const App = function () {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  return (
    <div>
      <Head>
        <title>Boba</title>
        {/*Add favicon and webmanifest*/}
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="shortcut icon" href="/images/favicon.svg" type="image/svg" />
        <link rel="shortcut icon" href="/images/favicon.png" type="image/png" />

        {/*Support for iOS bookmarks and homescreen*/}
        <link rel="apple-touch-icon" href="/images/boba-ios-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />

        {/*Support for android OS*/}
        <meta name="theme-color" content="#EAEDE6" />
      </Head>
      <header>
        <Header />
      </header>
      <main>
        <Filters
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
        <ShopList selectedFilters={selectedFilters} />
      </main>
    </div>
  );
};

export default App;
