import { screen, container } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste se ao favoritar a partir da página de detalhes', () => {
  it('Teste se é exibida na tela a mensagem "No favorite pokemon found", caso a pessoa não tenha Pokémon favoritos', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    userEvent.click(screen.getByRole('link', {
      name: /favorite pokémon/i,
    }));
    const noFavorite = screen.getByText(/no favorite pokémon found/i);

    expect(noFavorite).toBeInTheDocument();
  });

  it('Teste se apenas são exibidos os Pokémon favoritados', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    userEvent.click(screen.getByRole('link', {
      name: /more details/i,
    }));

    userEvent.click(screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    }));

    userEvent.click(screen.getByRole('link', {
      name: /favorite pokémon/i,
    }));

    // screen.logTestingPlaygroundURL();
    const favoritePikachu = screen.getByText(/pikachu/i);

    expect(favoritePikachu).toBeInTheDocument();
  });
});
