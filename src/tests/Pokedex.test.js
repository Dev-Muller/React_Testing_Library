import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste se o component "Pokedex" funciona corretamente', () => {
  it('Teste se os botões de filtragem por tipo possuem o nome correto', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    const allBtn = screen.getAllByRole('button');
    expect(allBtn).toBeDefined();
    expect(allBtn[0].innerHTML).toBe('All');
    expect(allBtn[1].innerHTML).toBe('Electric');
    expect(allBtn[2].innerHTML).toBe('Fire');
    expect(allBtn[3].innerHTML).toBe('Bug');
    expect(allBtn[4].innerHTML).toBe('Poison');
    expect(allBtn[5].innerHTML).toBe('Psychic');
    expect(allBtn[6].innerHTML).toBe('Normal');
    expect(allBtn[7].innerHTML).toBe('Dragon');
  });

  it('Teste se os botões de filtragem por tipo possuem o "data-testid=pokemon-type-button" exceto o botão "All"', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    const allBtn = screen.getAllByRole('button');
    const dataTeste = 'data-testid';
    const dataID = 'pokemon-type-button';
    expect(allBtn).toBeDefined();
    expect(allBtn[0]).not.toHaveAttribute(dataTeste, dataID);
    expect(allBtn[1]).toHaveAttribute(dataTeste, dataID);
    expect(allBtn[2]).toHaveAttribute(dataTeste, dataID);
    expect(allBtn[3]).toHaveAttribute(dataTeste, dataID);
    expect(allBtn[4]).toHaveAttribute(dataTeste, dataID);
    expect(allBtn[5]).toHaveAttribute(dataTeste, dataID);
    expect(allBtn[6]).toHaveAttribute(dataTeste, dataID);
    expect(allBtn[7]).toHaveAttribute(dataTeste, dataID);
  });

  it('Teste se é possível clicar no botão de filtragem All', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    userEvent.click(screen.getByRole('button', {
      name: /fire/i,
    }));

    userEvent.click(screen.getByRole('button', {
      name: /all/i,
    }));

    const Pikachu = screen.getByText(/pikachu/i);
    expect(Pikachu).toBeInTheDocument();
  });

  it('Teste se a página contém um heading com o texto "Encountered Pokémon"', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    const encountered = screen.getByRole('heading', {
      name: /encountered pokémon/i,
    });

    expect(encountered).toBeInTheDocument();
  });

  // it('Teste se apenas são exibidos os Pokémon favoritados', () => {
  //   const { history } = renderWithRouter(<App />);

  // expect(allBtn[0]).not.toHaveAttribute('data-getByTestId', 'pokemon-type-button');
  //   expect(history.location.pathname).toBe('/');

  //   userEvent.click(screen.getByRole('link', {
  //     name: /more details/i,
  //   }));

  //   userEvent.click(screen.getByRole('checkbox', {
  //     name: /pokémon favoritado\?/i,
  //   }));

  //   userEvent.click(screen.getByRole('link', {
  //     name: /favorite pokémon/i,
  //   }));

  //   // screen.logTestingPlaygroundURL();
  //   const favoritePikachu = screen.getByText(/pikachu/i);

  //   expect(favoritePikachu).toBeInTheDocument();
  // });
});
