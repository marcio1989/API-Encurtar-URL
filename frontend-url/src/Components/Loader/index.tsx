import React from 'react';
import colors from '../../styles/colors';

import { CircularProgress, ILoaderProps } from './styles';

const Loader: React.FC<ILoaderProps> = ({ colorloader, size }) => {
  return (
    <CircularProgress
      colorloader={colorloader || colors.primary1}
      size={size || 40}
    />
  );
};

export default Loader;
