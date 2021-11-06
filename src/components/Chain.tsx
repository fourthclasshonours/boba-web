import React from 'react';
import styled from 'styled-components';

import Chains from '../constants/Chains';

const Wrapper = styled.div<{ $background?: string }>`
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  background: ${(props) => props.$background ?? `var(--manatee)`};
  color: var(--white);
`;

interface Props {
  chain: string;
}

const Chain: React.FC<Props> = function (props) {
  const { chain } = props;

  let background;

  switch (chain) {
    case Chains.blackball:
      background = '#3E2A35';
      break;
    case Chains.chicha:
      background = '#5C8001';
      break;
    case Chains.eachACup:
      background = '#F4B860';
      break;
    case Chains.gongCha:
      background = '#8F2D56';
      break;
    case Chains.koi:
      background = '#5CA4A9';
      break;
    case Chains.liho:
      background = '#ED6A5A';
      break;
    case Chains.playmade:
      background = '#7765E3';
      break;
    case Chains.tigerSugar:
      background = '#7E3F8F';
      break;
  }

  return <Wrapper $background={background ?? undefined}>{chain}</Wrapper>;
};

export default Chain;
