import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import TweetActions from "./TweetActions";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import ClipLoader from "react-spinners/ClipLoader";
import ErrorGET from "./ErrorGET";

const TweetDetails = () => {
  const [tweetInfo, setTweetInfo] = useState({});
  const { tweetId } = useParams();

  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/tweet/${tweetId}`)
      .then((res) => res.json())
      .then((data) => {
        setTweetInfo(data.tweet);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  if (error === true) {
    return <ErrorGET />;
  }

  return (
    <>
      {tweetInfo.author ? (
        <MainContainer>
          <Cont1>
            <ProfImg src={tweetInfo.author.avatarSrc} />
            <HandleCont>
              <Name to={`/${tweetInfo.author.handle}`}>
                {tweetInfo.author.displayName}
              </Name>
              <Handle>@{tweetInfo.author.handle}</Handle>
            </HandleCont>
          </Cont1>
          <Status>{tweetInfo.status}</Status>
          {tweetInfo.media.length !== 0 && (
            <TweetImg src={tweetInfo.media[0].url} />
          )}
          <Cont2>
            <Date>{format(parseISO(tweetInfo.timestamp), " p • PP")}</Date>•
            Critter web app
          </Cont2>
          <TweetActions key={tweetInfo.id} />
        </MainContainer>
      ) : (
        <Loader>
          <ClipLoader />
        </Loader>
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

const TweetImg = styled.img`
  width: 875px;
  margin: 0 20px;
  border-radius: 20px;
`;

const Date = styled.div`
  margin: 10px 10px 10px 20px;
`;

const Status = styled.div`
  font-size: 25px;
  margin: 20px;
`;
const Name = styled(Link)`
  font-weight: bold;
  font-size: 30px;
  margin-bottom: 8px;
  &:link {
    text-decoration: none;
    color: black;
  }

  &:visited {
    text-decoration: none;
    color: black;
  }

  &:hover {
    text-decoration: underline;
    color: black;
  }

  &:active {
    text-decoration: none;
    color: black;
  }
`;
const Handle = styled.div`
  color: #777777;

  font-size: 17px;
`;

const Cont2 = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const Cont1 = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;
const ProfImg = styled.img`
  height: 75px;
  width: 75px;
  border-radius: 50%;
  padding: 10px;
`;
const HandleCont = styled.div`
  display: flex;
  flex-direction: column;
`;
const MainContainer = styled.div`
  display: flex;
  padding-left: 20px;
  flex-direction: column;
  border-right: solid 1px lightgray;
  border-left: solid 1px lightgray;
  font-family: sans-serif;
  width: 1000px;
`;

export default TweetDetails;
