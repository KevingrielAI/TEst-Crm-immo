import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { SafeLink, SafeNavLink } from '../SafeLink';

describe('SafeLink', () => {
  it('renders as <a> tag outside Router', () => {
    render(<SafeLink to="/test">Test Link</SafeLink>);
    const link = screen.getByText('Test Link');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '#/test');
  });

  it('renders as Link inside HashRouter', () => {
    render(
      <HashRouter>
        <SafeLink to="/test">Test Link</SafeLink>
      </HashRouter>
    );
    const link = screen.getByText('Test Link');
    expect(link).toBeInTheDocument();
  });

  it('does not throw error when rendered outside Router', () => {
    expect(() => {
      render(<SafeLink to="/test">Test Link</SafeLink>);
    }).not.toThrow();
  });
});

describe('SafeNavLink', () => {
  it('renders as <a> tag outside Router', () => {
    render(<SafeNavLink to="/test">Test NavLink</SafeNavLink>);
    const link = screen.getByText('Test NavLink');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '#/test');
  });

  it('renders as NavLink inside HashRouter', () => {
    render(
      <HashRouter>
        <SafeNavLink to="/test">Test NavLink</SafeNavLink>
      </HashRouter>
    );
    const link = screen.getByText('Test NavLink');
    expect(link).toBeInTheDocument();
  });

  it('does not throw error when rendered outside Router', () => {
    expect(() => {
      render(<SafeNavLink to="/test">Test NavLink</SafeNavLink>);
    }).not.toThrow();
  });
});
