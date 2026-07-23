import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { AtlasPage } from './AtlasPage';

describe('AtlasPage fail-closed production contract', () => {
  it('shows DataUnavailable when no approved release manifest is configured', async () => {
    render(
      <MemoryRouter initialEntries={['/atlas?status=active&types=A1,A2&view=nodes']}>
        <AtlasPage />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('atlas-route-loading')).toBeInTheDocument();
    expect(await screen.findByTestId('atlas-data-unavailable')).toBeInTheDocument();
    expect(screen.getByText(/mock이나 legacy 좌표를 대신 표시하지 않습니다/)).toBeInTheDocument();
    expect(screen.queryByText(/CONTRACT_FIXTURE/)).not.toBeInTheDocument();
  });
});
