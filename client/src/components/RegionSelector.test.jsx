import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import RegionSelector from './RegionSelector';

const server = setupServer(
  rest.get('/api/clouds', (req, res, ctx) => {
    return res(ctx.json({
      success: true,
      data: [{
        "cloud_description": "Test cloud",
        "cloud_name": "aws-europe-1",
        "geo_latitude": 0,
        "geo_longitude": 0,
        "geo_region": "europe"
      }]
    }));
  })
)

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

test('renders region provider selector', async () => {
  render(<RegionSelector setProviderDataCenter={() => {}} provider='aws' />);

  await waitFor(() => {
    const selectorElement = screen.getByLabelText(/Closest datacenters/i);
    expect(selectorElement.options.length).toEqual(1);
  });
});

test('renders region provider selector with empty list if unknown provider is selected', async () => {
  render(<RegionSelector setProviderDataCenter={() => {}} provider='test' />);

  await waitFor(() => {
    const selectorElement = screen.getByLabelText(/Closest datacenters/i);
    expect(selectorElement.options.length).toEqual(0);
  });
});

test('renders region provider selector with empty list if server return an error', async () => {
  server.use(
    rest.get('/api/clouds', (req, res, ctx) => {
      return res(ctx.json({
        success: false,
        error: {
          code: 1,
          message: 'ErrorMessage'
        }
      }));
    })
  );

  render(<RegionSelector setProviderDataCenter={() => {}} provider='test' />);

  await waitFor(() => {
    const selectorElement = screen.getByLabelText(/Closest datacenters/i);
    expect(selectorElement.options.length).toEqual(0);
  });
});
