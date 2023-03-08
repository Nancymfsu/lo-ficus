import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders greeting', () => {
  render(<App />);
  const welcomeText = screen.getByText("Welcome to loFicus");
  expect(welcomeText).toBeInTheDocument();
});
