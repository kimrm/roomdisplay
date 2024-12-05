import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
    await page.goto("http://roomdisplay.test");

    await expect(page).toHaveTitle("Welcome - Room Display");
});
