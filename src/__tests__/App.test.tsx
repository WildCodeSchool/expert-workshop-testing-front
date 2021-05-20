import React from 'react';
import { render, screen, fireEvent, waitFor, waitForDomChange } from '@testing-library/react';
import App from '../App';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom/extend-expect';

const url: string = "/msg.json";
const server = setupServer(
  rest.get(url, (req, res, ctx) => {
    const data = ctx.json({ msg: 'hello there' });
    return res(data);
  })
);


beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('loads and displays msg', async () => {
  render(<App url={url} />);
  await waitFor(() => screen.getByTestId('welcome-msg')); 
  expect(screen.getByTestId('welcome-msg')).toHaveTextContent('hello there')
});

test('test toggle button label OK to KO', async () => {
  render(<App url={url} />);
  fireEvent.click( screen.getByTestId("toggle-btn"));
  await waitFor(() => screen.getByTestId("toggle-btn")); 
  expect(screen.getByTestId("toggle-btn")).toHaveTextContent('KO');
});

test('test toggle button label KO to OK', async () => {
  render(<App url={url} />);
  fireEvent.click( screen.getByTestId("toggle-btn"));
  fireEvent.click( screen.getByTestId("toggle-btn"));
  await waitFor(() => screen.getByTestId("toggle-btn")); 
  expect(screen.getByTestId("toggle-btn")).toHaveTextContent('OK');
});
