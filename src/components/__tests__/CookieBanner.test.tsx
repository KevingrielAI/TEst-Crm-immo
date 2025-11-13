import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { CookieBanner } from '../CookieBanner';

describe('CookieBanner', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('shows banner on first visit', () => {
    render(
      <HashRouter>
        <CookieBanner />
      </HashRouter>
    );

    expect(
      screen.getByText(/Pour une navigation fluide et la mesure d'audience/i)
    ).toBeInTheDocument();
  });

  it('hides banner after accepting all cookies', () => {
    render(
      <HashRouter>
        <CookieBanner />
      </HashRouter>
    );

    const acceptButton = screen.getByText(/Tout accepter/i);
    fireEvent.click(acceptButton);

    expect(
      screen.queryByText(/Pour une navigation fluide et la mesure d'audience/i)
    ).not.toBeInTheDocument();
  });

  it('stores consent preference when accepting', () => {
    render(
      <HashRouter>
        <CookieBanner />
      </HashRouter>
    );

    const acceptButton = screen.getByText(/Tout accepter/i);
    fireEvent.click(acceptButton);

    const consent = localStorage.getItem('cookie-consent');
    expect(consent).not.toBeNull();

    const consentData = JSON.parse(consent!);
    expect(consentData.necessary).toBe(true);
    expect(consentData.analytics).toBe(true);
  });

  it('stores refusal preference when rejecting', () => {
    render(
      <HashRouter>
        <CookieBanner />
      </HashRouter>
    );

    const rejectButton = screen.getByRole('button', { name: /Refuser/i });
    fireEvent.click(rejectButton);

    const consent = localStorage.getItem('cookie-consent');
    expect(consent).not.toBeNull();

    const consentData = JSON.parse(consent!);
    expect(consentData.necessary).toBe(true);
    expect(consentData.analytics).toBe(false);
  });

  it('does not show banner if consent already given', () => {
    localStorage.setItem(
      'cookie-consent',
      JSON.stringify({
        necessary: true,
        analytics: true,
        timestamp: Date.now(),
      })
    );

    render(
      <HashRouter>
        <CookieBanner />
      </HashRouter>
    );

    expect(
      screen.queryByText(/Pour une navigation fluide et la mesure d'audience/i)
    ).not.toBeInTheDocument();
  });
});
