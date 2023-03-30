import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente "PokemonDetails.js" funciona corretamente', () => {
  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    const details = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(screen.getByRole('link', {
      name: /more details/i,
    }));

    expect(details).not.toBeInTheDocument();

    const pikachu = screen.getByRole('heading', {
      name: /pikachu details/i,
    });

    const summary = screen.getByRole('heading', {
      name: /summary/i,
    });

    const paragraph = screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i,
    );

    expect(pikachu).toHaveTextContent(/pikachu/i);
    expect(summary).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');

    userEvent.click(screen.getByRole('link', {
      name: /more details/i,
    }));

    const locationsSum = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    });

    const pikachu = screen.getAllByAltText('Pikachu location');

    const loc1 = screen.getByText(/kanto power plant/i);
    const loc2 = screen.getByText(/kanto viridian forest/i);

    expect(locationsSum).toBeInTheDocument();
    expect(pikachu).toHaveLength(2);
    expect(loc1).toBeInTheDocument();
    expect(loc2).toBeInTheDocument();
    expect(pikachu[0].src).toContain('https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(pikachu[1].src).toContain('https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');

    userEvent.click(screen.getByRole('link', {
      name: /more details/i,
    }));

    expect(history.location.pathname).toBe('/pokemon/25');

    const checkbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });

    userEvent.click(checkbox);

    const favIcon = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });

    expect(favIcon).toBeInTheDocument();

    const label = screen.getByText(/pokémon favoritado\?/i);

    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });
});
