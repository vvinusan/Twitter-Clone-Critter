import styled from "styled-components";
import { FiRepeat } from "react-icons/fi";
import TweetActions from "./TweetActions";
import { useNavigate } from "react-router-dom";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

//SMALL TWEET FORMAT MAKING UP FEED

const TweetSmall = ({ tweetInfo }) => {
  const navigate = useNavigate();

  return (
    <MainContainer>
      <Remeow>
        {tweetInfo.retweetFrom && (
          <>
            <FiRepeat />
            <Remeower>{tweetInfo.retweetFrom.displayName}</Remeower>
          </>
        )}
      </Remeow>

      <SubContainer>
        <ProfileImg src={tweetInfo.author.avatarSrc} />
        <TweetContent>
          <Details>
            <Name
              onClick={(event) => {
                event.stopPropagation();
                navigate(`/${tweetInfo.author.handle}`);
              }}
            >
              {tweetInfo.author.displayName}
            </Name>
            <Handle>@{tweetInfo.author.handle}</Handle>
            <Date>• {format(parseISO(tweetInfo.timestamp), "MMM d")}</Date>
          </Details>
          <Tweet>{tweetInfo.status}</Tweet>
          {tweetInfo.media.length !== 0 && (
            <TweetImg src={tweetInfo.media[0].url} />
          )}
        </TweetContent>
      </SubContainer>
      <TweetActions key={tweetInfo.id} />
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
  border-bottom: solid 1px lightgray;
  width: 1000px;
`;

const Remeow = styled.div`
  display: flex;
  margin: 15px 50px 0 50px;
`;

const Remeower = styled.div`
  margin-left: 10px;
  font-size: 15px;
`;
const SubContainer = styled.div`
  display: flex;
`;
const ProfileImg = styled.img`
  height: 75px;
  width: 75px;
  border-radius: 50%;
  margin: 10px;
`;

const TweetContent = styled.div`
  width: 875px;
  margin: 10px;
  display: flex;
  flex-direction: column;
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0px;
`;

const Name = styled.div`
  margin-right: 10px;
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 2px;
  &:hover {
    text-decoration: underline;
  }
`;
const Handle = styled.div`
  margin-right: 5px;
  color: #777777;

  font-size: 17px;
`;
const Date = styled.div`
  margin-right: 10px;
  color: #777777;
  font-size: 17px;
`;
const Tweet = styled.div`
  padding-top: 15px;
  font-size: 20px;
  width: 875px;
  display: flex;
  flex-wrap: wrap;
`;

const TweetImg = styled.img`
  width: 800px;
  margin-top: 20px;
  border-radius: 20px;
`;
export default TweetSmall;
