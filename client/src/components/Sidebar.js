import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { COLORS } from "../constants";
import { FiHome } from "react-icons/fi";
import { FiBookmark } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FiBell } from "react-icons/fi";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import ClipLoader from "react-spinners/ClipLoader";
import ErrorGET from "./ErrorGET";

const Sidebar = () => {
  const { currentUser, status } = useContext(CurrentUserContext);
  if (status === "error") {
    return <ErrorGET />;
  }

  return (
    <>
      {!currentUser ? (
        <Loader>
          <ClipLoader />
        </Loader>
      ) : (
        <MainContainer>
          <Logo />
          <NavCont>
            <NavSpan to="/">
              <FiHome /> <NavItem>Home</NavItem>
            </NavSpan>
            <NavSpan to={`/${currentUser.handle}`}>
              <FiUser />
              <NavItem>Profile</NavItem>
            </NavSpan>
            <NavSpan to="/notifications">
              <FiBell />
              <NavItem>Notificaitons</NavItem>
            </NavSpan>
            <NavSpan to="/bookmarks">
              <FiBookmark />
              <NavItem>Bookmarks</NavItem>
            </NavSpan>
          </NavCont>
        </MainContainer>
      )}
    </>
  );
};

const Loader = styled.div`
  width: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainContainer = styled.div`
  font-family: sans-serif;
  margin: 0 0 40px 0px;
  padding: 50px;
  height: 100vh;
`;

const NavCont = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavItem = styled.div`
  font-weight: bold;
  text-decoration: none;

  font-size: 20px;
  padding-left: 15px;
`;
const NavSpan = styled(NavLink)`
  display: flex;
  margin: 10px 0;
  align-items: center;
  border-radius: 20px;
  padding: 10px;
  color: black;
  &:hover {
    background-color: ${COLORS.highlight};
    color: ${COLORS.primary};
  }

  &:link {
    text-decoration: none;
    /* color: black; */
  }

  &:visited {
    text-decoration: none;
    /* color: black; */
  }
  &.active {
    color: ${COLORS.primary};
  }
`;

export default Sidebar;
