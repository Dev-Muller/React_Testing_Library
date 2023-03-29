import { act, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa se a aplicação de "Not Found" funciona corretamente', () => {
  it('Teste se a página contém um heading com o texto "Page requested not found" e se mostra a imagem', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    act(() => history.push('/xablau'));

    const notFound = screen.getByRole('heading', {
      name: /page requested not found/i,
    });

    expect(notFound).toBeInTheDocument();
  });

  it('Teste se a página mostra a imagem', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    act(() => history.push('/xablau'));

    const imgNotFound = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });

    const imgLink = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(imgNotFound).toBeInTheDocument();
    expect(imgNotFound).toHaveAttribute('src', imgLink);
  });
});
