import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './index';

test('renders the Dashboard heading', () => {
  render(<Dashboard />);
  const heading = screen.getByText(/dashboard/i);
  expect(heading).toBeInTheDocument();
});
