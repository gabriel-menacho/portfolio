import { expect, test } from "@playwright/test";

test("home renders", async ({ page }) => {
  await page.goto("/en");
  await expect(page.getByRole("navigation")).toBeVisible();
});

test("admin redirects unauthenticated users to login", async ({ page }) => {
  await page.goto("/en/admin");
  await expect(page).toHaveURL(/\/en\/auth\/login/);
});
