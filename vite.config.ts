import { defineConfig, configDefaults } from 'vitest/config'

export default defineConfig({
    test: {
        exclude: [...configDefaults.exclude],
        setupFiles: ['./test/helper/vite.setup.ts'],
        testTimeout: 60 * 1000 * 60,
        reporters: ['default', './qualitywatcher-reporter.ts'],
    }
})