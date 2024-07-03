import { Routes, Route, useNavigate } from "react-router-dom";
import { Container } from "semantic-ui-react";

import Users from "/src/pages/Users";
import Login from "/src/pages/Login";
import Blogs from "/src/pages/Blogs";
import BlogPage from "/src/pages/BlogPage";
import UserPage from "/src/pages/UserPage";
import Header from "/src/components/header/Header";
import AxiosInterceptorsSetup from "./services/middleware";

const App = () => {
  const navigate = useNavigate();
  AxiosInterceptorsSetup(navigate);

  return (
    <>
      <Header />
      <Container as="main">
        <h1>BlogsBlogsBlogs</h1>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Blogs />}></Route>
          <Route path="/blogs/:id" element={<BlogPage />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/users/:id" element={<UserPage />}></Route>
        </Routes>
      </Container>
    </>
  );
};

export default App;
