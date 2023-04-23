import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { COLORS } from "../constants";
import TweetSmall from "./TweetSmall";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import ErrorGET from "./ErrorGET";

const HomeFeed = () => {
  const { currentUser, status } = useContext(CurrentUserContext);
  const [homeFeed, setHomeFeed] = useState({});
  const [idOrder, setIdOrder] = useState([]);
  const [newTweet, setNewTweet] = useState("");
  const [postTweet, setPostTweet] = useState({});
  const [characRem, setCharacRem] = useState(280);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleTypeTweet = (value) => {
    const letterArr = value.split("");
    setCharacRem(280 - letterArr.length);

    setNewTweet(value);
  };

  const handlePostTweet = (event) => {
    event.preventDefault();

    fetch("/api/tweet", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newTweet }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPostTweet(data.tweet);
        //setNewTweet(""); //to clear after posting
      })
      .catch(() => {
        setError(true);
      });
  };

  useEffect(() => {
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        setHomeFeed(data.tweetsById);
        setIdOrder(data.tweetIds);
      })
      .catch(() => {
        setError(true);
      });
  }, [postTweet]);

  if (error === true) {
    return <ErrorGET />;
  }

  return (
    <Wrapper>
      {currentUser ? (
        <MainContainer>
          <Title>Home</Title>
          <TweetCont onSubmit={handlePostTweet}>
            <TweetField>
              <ProfileImg src={currentUser.avatarSrc} />
              <label htmlFor="tweet"></label>
              <Input
                type="text"
                id="tweet"
                placeholder="What's happening"
                onChange={(event) => handleTypeTweet(event.target.value)}
              ></Input>
            </TweetField>
            <BtnField>
              <CharCount
                style={{
                  color:
                    characRem < 0
                      ? "red"
                      : characRem <= 55
                      ? "orange"
                      : "lightgray",
                }}
              >
                {characRem}
              </CharCount>

              <MeowBtn disabled={characRem < 0} type="submit">
                Meow
              </MeowBtn>
            </BtnField>
          </TweetCont>
        </MainContainer>
      ) : (
        <Loader>
          <ClipLoader />
        </Loader>
      )}
      {idOrder.length ? (
        <MainFeed>
          {idOrder.map((id) => {
            return (
              <SubFeedCont
                key={homeFeed[id].id}
                onClick={() => {
                  navigate(`/tweet/${homeFeed[id].id}`);
                }}
              >
                <TweetSmall key={homeFeed[id].id} tweetInfo={homeFeed[id]} />
              </SubFeedCont>
            );
          })}
        </MainFeed>
      ) : (
        <Loader>
          <ClipLoader />
        </Loader>
      )}
    </Wrapper>
  );
};

const Loader = styled.div`
  width: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainFeed = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
`;
const Title = styled.div`
  font-family: sans-serif;
  font-weight: bold;
  font-size: 25px;
  padding: 20px 40px;
  border-bottom: 1px solid lightgray;
`;

const TweetCont = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-bottom: 15px solid lightgray;
`;
const TweetField = styled.div`
  display: flex;
`;
const ProfileImg = styled.img`
  height: 75px;
  width: 75px;
  border-radius: 50%;
`;

const Input = styled.textarea`
  width: 900px;
  height: 150px;
  margin-left: 15px;
  font-size: 20px;
  font-family: sans-serif;
  border: none;
  outline: white;
`;
const BtnField = styled.div`
  display: flex;
  justify-content: end;
  margin: 10px;
  align-items: center;
`;
const CharCount = styled.div`
  font-size: 20px;
  font-family: sans-serif;
  color: lightgray;
`;

const MeowBtn = styled.button`
  font-size: 20px;
  font-weight: bold;
  font-family: sans-serif;
  color: white;
  background-color: ${COLORS.primary};
  padding: 10px 15px;
  border-radius: 25px;
  margin-left: 15px;
  &:hover {
    font-weight: bold;
    background-color: transparent;
    color: ${COLORS.primary};
    outline: 3px solid ${COLORS.primary};
  }
  &:active {
    background-color: ${COLORS.highlight};
  }
`;

const SubFeedCont = styled.div`
  &:link {
    text-decoration: none;
    color: black;
  }

  &:visited {
    text-decoration: none;
    color: black;
  }

  &:hover {
    text-decoration: none;
    color: black;
  }

  &:active {
    text-decoration: none;
    color: black;
  }
`;

export default HomeFeed;
