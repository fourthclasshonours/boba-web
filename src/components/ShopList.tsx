import { getDistance } from 'geolib';
import flatten from 'lodash/flatten';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import Shop from './Shop';

const Wrapper = styled.div`
  margin: 0 auto 2rem;
  max-width: 800px;
  width: 90%;
`;

const ShopList: React.FC = function () {
  const [shops, setShops] = useState<{
    [chainName: string]: App.Shop[];
  } | null>(null);
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(
    null
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => setUserLocation(position),
      console.error
    );
  }, []);

  useEffect(() => {
    async function load() {
      const response = await fetch(
        'https://fourthclasshonours.github.io/sg-scraper/boba.json'
      );
      const data: { [chainName: string]: App.Shop[] } = await response.json();
      setShops(data);
    }
    load();
  }, []);

  const processedShops = useMemo(() => {
    if (shops === null) {
      return null;
    }

    const filteredShops = flatten(Object.values(shops)).filter((shop) => {
      const hasLocation = shop.location !== null;

      if (!hasLocation) {
        console.warn('Shop has no location', shop);
      }

      return hasLocation;
    });

    const shopsWithDistance = filteredShops.map((shop) => {
      if (userLocation === null) {
        return { ...shop, distance: -1 };
      }

      const userCoords = {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      };

      const shopCoords = {
        latitude: shop.location.coordinates[1],
        longitude: shop.location.coordinates[0],
      };

      const distance = getDistance(userCoords, shopCoords);

      return {
        ...shop,
        distance,
      };
    });

    const sortedShops = shopsWithDistance.sort(
      (prevShop, nextShop) => prevShop.distance - nextShop.distance
    );

    return sortedShops;
  }, [userLocation, shops]);

  if (processedShops === null) {
    return <Wrapper>Loading...</Wrapper>;
  }

  return (
    <Wrapper>
      {processedShops.map((shop) => (
        <Shop shop={shop} key={shop.address} distance={shop.distance} />
      ))}
    </Wrapper>
  );
};

export default ShopList;
