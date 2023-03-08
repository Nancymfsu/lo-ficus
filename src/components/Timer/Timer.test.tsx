import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Timer from './Timer';

describe('<Timer />', () => {
  test('it should mount', () => {
    render(<Timer />);
    
    const timer = screen.getByTestId('Timer');

    expect(timer).toBeInTheDocument();
  });
});