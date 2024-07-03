import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Blog from "./Blog";

const user = { id: "123", name: "Lou Lou", username: "Loulou" };
const blog = {
  id: "456",
  user: user,
  author: "Riri",
  title: "My Recipe",
  url: "www.youhou.you",
  likes: "0",
};

describe("<Blog />", () => {
  const onLike = vi.fn();

  beforeEach(() => {
    render(
      <MemoryRouter>
        <Blog user={user} blog={blog} handleLike={onLike}>
          {" "}
        </Blog>
      </MemoryRouter>
    ).container;
  });

  test("renders by default the blog's title and author", () => {
    const title = screen.getByText(blog.title, { exact: false });
    const author = screen.getByText(blog.author, { exact: false });
    expect(title).toBeDefined();
    expect(author).toBeDefined();
  });

  test("does not render by default the blog's likes and url", () => {
    const url = screen.queryByText(blog.url, { exact: false });
    const likes = screen.queryByText(blog.likes, { exact: false });
    expect(url).toBeFalsy();
    expect(likes).toBeFalsy();
  });
});
