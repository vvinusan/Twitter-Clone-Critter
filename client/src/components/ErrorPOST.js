import { FaBomb } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";

//PLEASE DISREGARD, ENDED UP USING ErrorGET.js AS THE DEFAULT ERROR MESSAGE FOR ALL SCENARIOS

const ErrorPOST = () => {
  return (
    <Container>
      <Icon>
        <FaBomb />
      </Icon>
      <Title>Meow Failed!</Title>
      <SubTitle>
        No worries, go back <HomeLink to={"/"}>home</HomeLink> and try again!
      </SubTitle>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
  width: 1000px;
  align-items: center;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
`;
const Icon = styled.div`
  font-size: 50px;
  margin: 200px 0 50px 0;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 30px;
  margin-bottom: 20px;
`;

const HomeLink = styled(Link)`
  font-size: 20px;
  text-decoration: underline;
  display: inline;
  color: blue;
`;

const SubTitle = styled.div`
  font-size: 20px;
`;
export default ErrorPOST;
