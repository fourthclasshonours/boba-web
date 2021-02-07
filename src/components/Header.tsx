import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  overflow: auto;
`;

const Title = styled.h1`
  font-size: 4rem;
  color: var(--purple);
  max-width: 800px;
  width: 90%;
  margin: 2rem auto;
`;

const Header: React.FC = () => (
  <Wrapper>
    <Title className="header__title">Boba</Title>
  </Wrapper>
);

export default Header;
