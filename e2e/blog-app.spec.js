const { test, expect, describe, beforeEach } = require("@playwright/test");
import { goToLogin, loginWith, createBlog } from "./helper";

const userCred = {
  name: "Oui Oui",
  username: "ouioui",
  password: "123",
};

const blogData = {
  title: "A beautiful title",
  author: "A very good author",
  url: "www.youhouuu.youhouuu",
};

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: userCred,
    });
    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    await goToLogin(page);
    const form = await page.locator("form", { hasText: "usernamepassword" });
    await expect(form).toBeVisible();
    await expect(form.getByRole("textbox", { name: "username" })).toBeVisible();
    await expect(form.getByRole("textbox", { name: "password" })).toBeVisible();
    await expect(form.getByRole("button", { type: "submit" })).toBeVisible();
  });

  describe("Login", () => {
    beforeEach(async ({ page }) => {
      await goToLogin(page);
    });
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, userCred);
      await expect(
        page.getByText(`Logged in as '${userCred.name}'`)
      ).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await goToLogin(page);
      await loginWith(page, { username: "ouioui", password: "wrongpassword" });
      await expect(page.getByText(`wrong credentials`)).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await goToLogin(page);
      await loginWith(page, userCred);
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByText("Create New").click();
      await createBlog(page, blogData);
      await expect(page.getByText(blogData.url)).toBeVisible();
    });
    describe("and there is a blog", () => {
      beforeEach(async ({ page }) => {
        await page.getByText("Create New").click();
        await createBlog(page, blogData);
      });

      test("the user who posted it can delete the blog", async ({ page }) => {
        page.once("dialog", async (dialog) => {
          await dialog.accept();
        });
        await page.getByRole("button", { name: "remove" }).click();
        await expect(page.getByText("deleted")).toBeVisible();
        await expect(
          page.getByRole("list").getByRole("listitem", {
            hasText: `${blogData.author}${blogData.title}`,
          })
        ).not.toBeVisible();
      });
    });
  });
});
