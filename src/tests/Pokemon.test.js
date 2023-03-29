import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste se o component "Pokemon" funciona corretamente', () => {
  it('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    const pikachu = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const img = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });

    expect(pikachu).toHaveTextContent(/pikachu/i);
    expect(type).toHaveTextContent(/electric/i);
    expect(weight).toHaveTextContent(/6.0/i);
    expect(img.src).toContain('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL "/pokemon/<id>", onde "<id>" é o id do Pokémon exibido', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');

    userEvent.click(screen.getByRole('link', {
      name: /more details/i,
    }));

    expect(history.location.pathname).toBe('/pokemon/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');

    userEvent.click(screen.getByRole('link', {
      name: /more details/i,
    }));

    expect(history.location.pathname).toBe('/pokemon/25');

    userEvent.click(screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    }));

    const favIcon = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });

    expect(favIcon.src).toContain('/star-icon.svg');
    expect(favIcon.alt).toContain('Pikachu is marked as favorite');
  });
});
