import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppRouter } from '../AppRouter';

describe('AppRouter', () => {
  beforeEach(() => {
    // Reset hash before each test
    window.location.hash = '';
  });

  it('renders Home page by default', () => {
    render(<AppRouter />);
    expect(screen.getByText(/Louer ou vendre sans stress/i)).toBeInTheDocument();
  });

  it('navigates to Gestion Locative page', () => {
    window.location.hash = '#/gestion-locative';
    render(<AppRouter />);
    expect(screen.getByText(/Louer sans stress. Gérer avec méthode./i)).toBeInTheDocument();
  });

  it('navigates to Vente page', () => {
    window.location.hash = '#/vente';
    render(<AppRouter />);
    expect(screen.getByText(/Vendre au bon prix, sans précipitation./i)).toBeInTheDocument();
  });

  it('navigates to Contact page', () => {
    window.location.hash = '#/contact';
    render(<AppRouter />);
    expect(screen.getByText(/Parlons de votre projet/i)).toBeInTheDocument();
  });
});
