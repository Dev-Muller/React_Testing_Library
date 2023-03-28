import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste se a página contém as informações sobre a Pokédex', () => {
  it(' contém um heading com o texto "About Pokédex"', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    userEvent.click(screen.getByRole('link', {
      name: /about/i,
    }));
    const headingAbout = screen.getByRole('heading', {
      name: /about pokédex/i,
    });

    expect(headingAbout).toBeInTheDocument();
    expect(history.location.pathname).toBe('/about');
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    userEvent.click(screen.getByRole('link', {
      name: /about/i,
    }));

    const imgAbout = screen.getByRole('img', {
      name: /pokédex/i,
    });

    const imgLink = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(imgAbout).toBeInTheDocument();
    expect(imgAbout).toHaveAttribute('src', imgLink);
  });
});
