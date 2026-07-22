import React from 'react';
import { OverlayProvider } from './providers/OverlayProvider';
import { AppRouter } from './router/AppRouter';

export default function App() {
  return (
    <OverlayProvider>
      <AppRouter />
    </OverlayProvider>
  );
}
