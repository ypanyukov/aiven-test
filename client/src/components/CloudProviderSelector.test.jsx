import { render, screen } from '@testing-library/react';
import CloudProviderSelector from './CloudProviderSelector';

test('renders cloud provider selector', () => {
  render(<CloudProviderSelector setProvider={() => {}} />);
  const selectorElement = screen.getByLabelText(/Cloud Provider/i);
  expect(selectorElement.options.length).toEqual(4);
});
