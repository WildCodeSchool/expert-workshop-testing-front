import { render, screen, fireEvent, waitFor, waitForDomChange, queryByTestId } from '@testing-library/react';
import Form from '../Form';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom/extend-expect';

const url: string = "/msg.json";
const fakeData:any = {msg:"coucou les wilders"};
const server = setupServer(
    rest.get(url, (req, res, ctx) => {
        const data = ctx.json(fakeData);
        return res(data);
    })
);

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test(
    'has a submit button', 
    async () => {
    render(<Form url={url} />);
    // on va demander à 'attendre' que l'élément qui porte le 'test-id' 'submit-btn' 
    // soit disponible au sein du rendu. Pour ça on emploie la fonctionnalité waitFor. 

    const btn:HTMLElement|null = await waitFor( 
        ()=>{
            return screen.queryByTestId("submit-btn");
        }
    ); 

    expect(btn).not.toBeNull();
    expect(btn).toBeInstanceOf(HTMLButtonElement);
});