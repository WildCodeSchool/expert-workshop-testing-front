import { render, screen, fireEvent, waitFor, waitForDomChange } from '@testing-library/react';
import Form from '../Form';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom/extend-expect';

const url: string = "/msg.json";
const server = setupServer(
    rest.get(url, (req, res, ctx) => {
        const data = ctx.json({ msg: 'OK' });
        return res(data);
    })
);

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('has mandatory fields', async () => {
    render(<Form url={url} />);
    await waitFor(() => screen.getByTestId('submit-btn'));
    expect(screen.getByTestId('submit-btn')).toBeInTheDocument();
    expect(screen.getByTestId('name-field')).toBeInTheDocument();
    expect(screen.getByTestId('surname-field')).toBeInTheDocument();
    expect(screen.getByTestId('address-field')).toBeInTheDocument();
    expect(screen.getByTestId('msg-field')).toBeInTheDocument();
});

test('test form submission', async () => {
    render(<Form url={url} />);
    fireEvent.click(screen.getByTestId('submit-btn'));
    await waitFor(() => screen.getByTestId('server-msg'));
    
    expect(screen.getByTestId('server-msg')).toHaveTextContent('OK');
});

test('test callback after submission', async () => {
    const callback = jest.fn(); 
    render(<Form url={url} onSubmit={callback} />);
    fireEvent.click(screen.getByTestId('submit-btn'));
    await waitFor(() => screen.getByTestId('server-msg'));
    expect(callback).toHaveBeenCalledTimes(1);
});