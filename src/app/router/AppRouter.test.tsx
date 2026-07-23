import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { AppProviders } from '@/app/providers/AppProviders';
import { AppRouter } from './AppRouter';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </MemoryRouter>
  );
}

describe('AppRouter', () => {
  it('renders the story route and semantic global links', () => {
    renderAt('/');
    expect(screen.getByRole('heading', { name: '“검토하겠습니다”' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '방법론 (Method)' })).toHaveAttribute('href', '/method');
  });

  it('renders a direct evidence URL as a full detail page', () => {
    renderAt('/evidence/ev-101');
    const detailPage = screen.getByTestId('evidence-direct-page');
    expect(detailPage).toBeInTheDocument();
    expect(within(detailPage).getByText('EV-101')).toBeInTheDocument();
  });

  it('shows an explicit not-found state for an unknown detail id', () => {
    renderAt('/case/not-real');
    expect(screen.getByTestId('detail-not-found')).toBeInTheDocument();
  });

  it('renders the wildcard 404 page', () => {
    renderAt('/missing-route');
    expect(screen.getByRole('heading', { name: '요청한 기록을 찾을 수 없습니다' })).toBeInTheDocument();
  });
});
