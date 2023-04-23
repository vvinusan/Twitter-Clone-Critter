import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../GlobalStyles";
import HomeFeed from "./HomeFeed";
import Notifications from "./Notifications";
import Bookmarks from "./Bookmarks";
import TweetDetails from "./TweetDetails";
import Profile from "./Profile";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import ClipLoader from "react-spinners/ClipLoader";

const App = () => {
  const { currentUser, status } = useContext(CurrentUserContext);

  return (
    <>
      {status === "loading" ? (
        <Loader>
          <ClipLoader />
        </Loader>
      ) : (
        <BrowserRouter>
          <GlobalStyle />
          <Container>
            <Sidebar />
            <Routes>
              <Route path="/" element={<HomeFeed />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/tweet/:tweetId" element={<TweetDetails />} />
              <Route path="/:profileId" element={<Profile />} />
            </Routes>
          </Container>
        </BrowserRouter>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
`;

const Loader = styled.div`
  width: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default App;
