const goToLogin = async (page) => {
  const link = await page.getByRole("link", { name: "Log in" });
  await link.click();
};

const goToBlogs = async (page) => {
  const link = await page.getByRole("link", { name: "Blogs" });
  await link.click();
};

const loginWith = async (page, { username, password }) => {
  const form = await page.locator("form", { hasText: "usernamepassword" });
  await form.getByRole("textbox", { name: "username" }).fill(username);
  await form.getByRole("textbox", { name: "password" }).fill(password);
  await form.getByRole("button", { type: "submit" }).click();
};

const createBlog = async (page, { title, author, url }) => {
  const form = await page.locator("form", { hasText: "titleauthorurl" });
  await form.getByRole("textbox", { name: "title" }).fill(title);
  await form.getByRole("textbox", { name: "author" }).fill(author);
  await form.getByPlaceholder("Provide a link to the blog...").fill(url);
  await form.getByRole("button", { type: "submit" }).click();
  await page.locator("h2", { hasText: title }).waitFor();
};

export { goToBlogs, goToLogin, loginWith, createBlog };
