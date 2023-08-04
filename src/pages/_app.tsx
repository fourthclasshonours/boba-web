import 'normalize.css';
import '../stylesheets/styles.scss';

import { Analytics } from '@vercel/analytics/react';
import { AppProps } from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from '../theme';

const App: React.FC<AppProps> = function (props) {
  const { Component, pageProps } = props;

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <Analytics />
    </ThemeProvider>
  );
};

export default App;
