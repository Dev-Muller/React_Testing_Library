import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  it('O primeiro link deve possuir o texto "Home"', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });

    expect(linkHome).toBeInTheDocument();
  });
  it('O primeiro link deve possuir o texto "About"', () => {
    renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', {
      name: /about/i,
    });

    expect(linkAbout).toBeInTheDocument();
  });
  it('O primeiro link deve possuir o texto "Favorite Pokemon"', () => {
    renderWithRouter(<App />);

    const linkFavorite = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });

    expect(linkFavorite).toBeInTheDocument();
  });
});
