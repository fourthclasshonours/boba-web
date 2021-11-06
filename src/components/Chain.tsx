import React from 'react';
import styled from 'styled-components';

import { ChainColors, ChainName } from '../constants/Chains';

const Wrapper = styled.div<{ $background?: string }>`
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  background: ${(props) => props.$background ?? `var(--manatee)`};
  color: var(--white);
`;

interface Props {
  className?: string;
  chain: ChainName;
  handleClick?: React.MouseEventHandler;
}

const Chain: React.FC<Props> = function (props) {
  const { className, chain, handleClick } = props;

  return (
    <Wrapper
      className={className}
      onClick={handleClick}
      $background={ChainColors[chain] ?? undefined}
    >
      {chain}
    </Wrapper>
  );
};

export default Chain;
