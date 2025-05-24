
import { test, expect } from '@playwright/test';

test.describe('Main Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the home page before each test.
    await page.goto('/');
  });

  test('should navigate to portfolio page', async ({ page }) => {
    // Assuming 'Portfolio' link is identifiable.
    // On desktop, it's a direct link. On mobile, it's in bottom nav.
    // Playwright can find it if it's visible.
    await page.getByRole('link', { name: /Portfolio/i }).first().click();
    await expect(page).toHaveURL('/portfolio');
    // Check for a heading specific to the portfolio page
    await expect(page.getByRole('heading', { name: 'Student Portfolio' })).toBeVisible();
  });

  test('should navigate to messages page', async ({ page }) => {
    await page.getByRole('link', { name: /Messages/i }).first().click();
    await expect(page).toHaveURL('/messages');
    await expect(page.getByRole('heading', { name: /Messages/i })).toBeVisible();
  });

  test('should navigate to more page', async ({ page }) => {
    await page.getByRole('link', { name: /More/i }).first().click();
    await expect(page).toHaveURL('/more');
    // The "More" page has no explicit title in its current structure,
    // so we might check for a known item on that page.
    // For example, "Our Awards"
    await expect(page.getByText('Our Awards')).toBeVisible();
  });

  test('should navigate to my learning page', async ({ page }) => {
    await page.getByRole('link', { name: /My Learning/i }).first().click();
    await expect(page).toHaveURL('/my-learning');
    await expect(page.getByRole('heading', { name: /My Learning/i })).toBeVisible();
  });

  // Test for a page accessible from "More" section
  test('should navigate to event booking page from more page', async ({ page }) => {
    await page.getByRole('link', { name: /More/i }).first().click();
    await expect(page).toHaveURL('/more');
    
    // Click on the "Event Booking" card/link
    await page.getByRole('link', { name: /Event Booking/i }).click();
    await expect(page).toHaveURL('/more/event-booking');
    await expect(page.getByRole('heading', { name: /Event Booking/i })).toBeVisible();
  });
});
