import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Mock window.scrollTo for JSDOM
window.scrollTo = vi.fn();

// Cleanup after each test
afterEach(() => {
  cleanup();
});
