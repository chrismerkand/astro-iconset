import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  resolve: {
    alias: {
      // Provide a stub for the virtual module generated at dev/build time.
      // Component tests import this; the stub returns an empty collection map.
      'virtual:astro-iconset': fileURLToPath(
        new URL('./tests/__mocks__/virtual-iconset.ts', import.meta.url)
      ),
    },
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      // Measure the shippable logic, not the test scaffolding or generated types.
      include: ['src/**/*.ts', 'components/**/*.ts'],
      exclude: ['**/*.d.ts', 'tests/**'],
      reporter: ['text', 'html'],
    },
  },
});
