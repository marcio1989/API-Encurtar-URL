import React from 'react';

import { Container, ICardProps } from './styles';

const Card: React.FC<ICardProps> = ({ children, maxWidth }) => {
  return (
    <Container
    maxWidth={maxWidth || 698}
    >
      {children}
    </Container>
  );
};

export default Card;
