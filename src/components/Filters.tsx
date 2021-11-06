import React from 'react';
import styled from 'styled-components';

import { ChainColors, ChainNames } from '../constants/Chains';
import Chain from './Chain';
import { Wrapper } from './Styles';

const Container = styled.div`
  border-bottom: 1px solid var(--manatee);
  padding-bottom: 1rem;
`;

const Heading = styled.h3`
  margin: 0 0 0.5rem;
  color: var(--black);
`;

const ChainsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
`;

const StyledChain = styled(Chain)<{
  $color: string;
  $isActive: boolean;
}>`
  cursor: pointer;
  ${(props) =>
    !props.$isActive &&
    `
    opacity: 0.2;
  `}
`;

interface Props {
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

const Filters: React.FC<Props> = function (props) {
  const { selectedFilters, setSelectedFilters } = props;

  const noFilters = selectedFilters.length === 0;

  const handleChainClick = (chain: string) => {
    if (selectedFilters.includes(chain)) {
      const newFilters = selectedFilters.filter((c) => c !== chain);
      setSelectedFilters(newFilters);
    } else {
      setSelectedFilters([...selectedFilters, chain]);
    }
  };

  return (
    <Wrapper>
      <Container>
        <Heading>
          Filters {selectedFilters.length > 0 && `(${selectedFilters.length})`}
        </Heading>
        <ChainsWrapper>
          {Object.values(ChainNames).map((chain) => (
            <StyledChain
              $color={ChainColors[chain]}
              $isActive={noFilters || selectedFilters.includes(chain)}
              handleClick={() => handleChainClick(chain)}
              key={chain}
              chain={chain}
            />
          ))}
        </ChainsWrapper>
      </Container>
    </Wrapper>
  );
};

export default Filters;
