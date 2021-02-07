import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 1rem;
`;

const Name = styled.h2`
  margin: 0 0 0.5rem;
  font-weight: normal;
`;

const Link = styled.a`
  margin: 0;
  color: $manatee;
`;

const Distance = styled.p`
  margin: 0;
  color: $manatee;
`;

interface Props {
  shop: App.Shop;
  distance: number;
}

const Shop: React.FC<Props> = function (props) {
  const { shop, distance } = props;
  const formatName = () => {
    const { chain, title } = shop;

    // If title ends up as null, just return the chain
    if (title === null) {
      return `${chain}`;
    }

    if (title.includes('@')) {
      return title;
    }

    return `${chain} @ ${title}`;
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
      <Name>{formatName()}</Name>
      <Link href={openMapApp(shopCoordinates)} target="_system">
        {shop.address}
      </Link>
      {distance !== null ? <Distance>{distance} m</Distance> : null}
    </Wrapper>
  );
};

export default Shop;
