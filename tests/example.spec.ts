
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Tiny Scholars Hub/);
});

test('homepage has daily feed section', async ({ page }) => {
  await page.goto('/');

  // Check for the presence of a known element from the DailyFeedSection
  // This assumes DailyFeedSection renders some identifiable content.
  // Let's assume FeedItemCard renders a Card component.
  const feedCard = page.locator('article > div > header').first(); // A bit generic, but aims for FeedItemCard structure
  await expect(feedCard).toBeVisible({ timeout: 10000 }); // Increased timeout
});
