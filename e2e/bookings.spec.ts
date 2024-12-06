import { expect, test } from "@playwright/test";
import { appName, baseUrl } from "./env";

test("show bookings page", async ({ page }) => {
    const locationSlug = "test-location";
    const locationName = "Test Location";
    await page.goto(`${baseUrl}/locations/${locationSlug}`);

    const heading = page.locator("h1");

    await expect(heading).toHaveText(`${appName} - ${locationName}`);
});
