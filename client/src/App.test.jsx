import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main screen', () => {
  render(<App />);
  const headerElement = screen.getByText(/Cloud selection/i);
  expect(headerElement).toBeInTheDocument();
});
