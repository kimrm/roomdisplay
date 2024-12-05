import { expect, test } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const APP_URL = process.env.APP_URL || "http://localhost";
const APP_PORT = process.env.APP_PORT || "8000";

test("has title", async ({ page }) => {
    const url = `${APP_URL}:${APP_PORT}`;

    await page.goto(url);

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Welcome - Roomdisplay/);
});
