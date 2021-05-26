import { render, screen, fireEvent, waitFor, waitForDomChange, queryByTestId } from '@testing-library/react';
import Form from '../Form';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom/extend-expect';

const url: string = "/msg.json";
const fakeData: any = { msg: "coucou les wilders" };

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
    'has mandatory fields and button',
    async () => {
        render(<Form url={url} />);
        // on va demander à 'attendre' que l'élément qui porte le 'test-id' 'submit-btn' 
        // soit disponible au sein du rendu. Pour ça on emploie la fonctionnalité waitFor. 

        const btn: HTMLElement | null = await waitFor(
            () => {
                return screen.queryByTestId("submit-btn");
            }
        );

        expect(screen.queryByTestId("username")).not.toBeNull();
        expect(screen.queryByTestId("username")).toBeInstanceOf(HTMLInputElement);

        expect(screen.queryByTestId("usersurname")).not.toBeNull();
        expect(screen.queryByTestId("usersurname")).toBeInstanceOf(HTMLInputElement);

        expect(screen.queryByTestId("usermail")).not.toBeNull();
        expect(screen.queryByTestId("usermail")).toBeInstanceOf(HTMLInputElement);

        expect(screen.queryByTestId("usermsg")).not.toBeNull();
        expect(screen.queryByTestId("usermsg")).toBeInstanceOf(HTMLInputElement);

        expect(btn).not.toBeNull();
        expect(btn).toBeInstanceOf(HTMLButtonElement);
    }
);

test( 
    "should display a message on button click", 
    async ()=>{

        render(<Form url={url} />);
        fireEvent.click( screen.getByTestId("submit-btn")); 

        await waitFor( ()=> screen.getByTestId("server-msg")); 
        expect( screen.queryByTestId("server-msg")).toHaveTextContent("OK");
    }
); 