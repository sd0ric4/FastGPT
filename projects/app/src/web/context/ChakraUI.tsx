import { Router } from 'next/router';
import { ReactNode } from 'react';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css';
// import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
// import { theme } from '@fastgpt/web/styles/theme';
import { Provider } from '@/components/ui/provider';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export const ChakraUIContext = ({ children }: { children: ReactNode }) => {
  return <Provider>{children}</Provider>;
};

export default ChakraUIContext;
