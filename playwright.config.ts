 // playwright.config.ts
    import { defineConfig } from '@playwright/test';

    export default defineConfig({
      use: {
        actionTimeout: 300000, // Sets default action timeout to 30 seconds
        headless: false, // Set to false for headed mode



      },
    });