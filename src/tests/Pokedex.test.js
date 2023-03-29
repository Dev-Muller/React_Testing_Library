import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste se o component "Pokedex" funciona corretamente', () => {
  it('Teste se a página contém um heading com o texto "Encountered Pokémon"', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    const encountered = screen.getByRole('heading', {
      name: /encountered pokémon/i,
    });

    expect(encountered).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão "Próximo Pokémon" é clicado', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    userEvent.click(screen.getByRole('button', {
      name: /próximo pokémon/i,
    }));

    const nextBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    expect(nextBtn).toBeDefined();
    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
  });

  it('Teste se é apenas um Pokémon exibido na pokedex', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    const img = screen.getAllByRole('img');

    expect(img).toHaveLength(1);
  });

  it('Teste se os botões de filtragem por tipo possuem o nome correto', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    const allBtn = screen.getAllByRole('button');
    expect(allBtn).toBeDefined();
    // expect(allBtn[0].innerHTML).toBe('All');
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

    const allBtn = screen.getAllByTestId('pokemon-type-button');
    const dataTeste = 'data-testid';
    const dataID = 'pokemon-type-button';
    expect(allBtn).toBeDefined();
    expect(allBtn[0]).toHaveAttribute(dataTeste, dataID);
    expect(allBtn[1]).toHaveAttribute(dataTeste, dataID);
    expect(allBtn[2]).toHaveAttribute(dataTeste, dataID);
    expect(allBtn[3]).toHaveAttribute(dataTeste, dataID);
    expect(allBtn[4]).toHaveAttribute(dataTeste, dataID);
    expect(allBtn[5]).toHaveAttribute(dataTeste, dataID);
    expect(allBtn[6]).toHaveAttribute(dataTeste, dataID);
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

    const typeElectric = screen.getAllByText(/electric/i);
    expect(typeElectric).toHaveLength(2);

    userEvent.click(screen.getByRole('button', {
      name: /próximo pokémon/i,
    }));

    const typeFire = screen.getAllByText(/fire/i);
    expect(typeFire).toHaveLength(2);
  });

  it('Teste se o botão de filtro funciona corretamente', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    userEvent.click(screen.getByRole('button', {
      name: /fire/i,
    }));

    const typeFire = screen.getAllByText(/fire/i);
    expect(typeFire).toHaveLength(2);

    userEvent.click(screen.getByRole('button', {
      name: /próximo pokémon/i,
    }));

    expect(typeFire).toHaveLength(2);
  });
});
