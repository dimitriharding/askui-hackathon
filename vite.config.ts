import { defineConfig, configDefaults } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'c8', // or 'c8'
            reporter: ['text', 'json', 'html'],
            clean: true,
        },
        exclude: [...configDefaults.exclude],
        setupFiles: ['./helper/setup.ts'],
    }
})