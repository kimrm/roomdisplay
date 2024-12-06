import { expect, test } from "@playwright/test";
import { baseUrl, venueName } from "./env";

const locationSlug = "test-location";
const locationName = "Test Location";

test.describe("Bookings", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`${baseUrl}/locations/${locationSlug}`);
    });

    test("displays bookings page", async ({ page }) => {
        const heading = page.locator("h1");

        await expect(heading).toHaveText(`${venueName} - ${locationName}`);
    });

    test("displays bookings", async ({ page }) => {
        const items = page.locator("li");
        const bookings = page.locator("#bookings", {
            has: items,
        });

        await expect(bookings).toBeVisible();
    });
});
