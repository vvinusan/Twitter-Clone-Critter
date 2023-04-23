import { FaBomb } from "react-icons/fa";
import styled from "styled-components";

const ErrorGET = () => {
  return (
    <Container>
      <Icon>
        <FaBomb />
      </Icon>
      <Title>An unknown error has occured</Title>
      <SubTitle>
        Please try refreshing the page, or <SpanLink>contact support</SpanLink>{" "}
        if the problem persists
      </SubTitle>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
  width: 1000px;
  height: 100vh;
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

const SpanLink = styled.span`
  font-size: 20px;
  text-decoration: underline;
  color: blue;
`;

const SubTitle = styled.div`
  font-size: 20px;
`;
export default ErrorGET;
