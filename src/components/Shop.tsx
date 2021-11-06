import React from 'react';
import styled from 'styled-components';

import { ChainName } from '../constants/Chains';
import Chain from './Chain';

const Wrapper = styled.div`
  margin-bottom: 1rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 0.5rem;
`;

const Name = styled.h2`
  margin: 0 0 0 0.5rem;
  font-weight: normal;
`;

const Link = styled.a`
  margin: 0;
  color: var(--manatee);
`;

const Distance = styled.p`
  margin: 0;
  color: var(--purple);
`;

interface Props {
  shop: App.Shop;
  distance: number;
}

const Shop: React.FC<Props> = function (props) {
  const { shop, distance } = props;
  const formatName = () => {
    const { chain, title } = shop;
    let newTitle = title;

    // If title ends up as null, just return the chain
    if (title === null) {
      return `${chain}`;
    }

    if (title.includes('@')) {
      newTitle = title.split('@')[1];
    }

    return newTitle;
  };

  function openMapApp(shopCoordinates: string) {
    const isAppleOS = navigator.platform.match(/(iPhone|iPod|iPad)/i) !== null;

    // Open Apple Maps if OS is iOS
    if (isAppleOS) {
      return `maps:?daddr=${shopCoordinates}`;
    }

    // Open Google Maps app/web on other platforms
    return `https://www.google.com/maps/dir/?api=1&destination=${shopCoordinates}`;
  }

  const shopCoordinates = `${shop.location.coordinates[1]},${shop.location.coordinates[0]}`;

  return (
    <Wrapper>
      <TitleWrapper>
        <Chain chain={shop.chain as ChainName} />
        <Name>{formatName()}</Name>
      </TitleWrapper>
      <Link href={openMapApp(shopCoordinates)} target="_system">
        {shop.address}
      </Link>
      {distance !== null ? <Distance>{distance} m</Distance> : null}
    </Wrapper>
  );
};

export default Shop;
