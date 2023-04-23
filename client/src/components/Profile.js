import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";
import { FiMapPin } from "react-icons/fi";
import { COLORS } from "../constants";
import TweetSmall from "./TweetSmall";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import ErrorGET from "./ErrorGET";

const Profile = () => {
  const [profInfo, setProfInfo] = useState(null);
  const { profileId } = useParams();
  const [feeds, setFeeds] = useState({});
  const [idOrder, setIdOrder] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((data) => {
        setProfInfo(data.profile);
      })
      .catch(() => {
        setError(true);
      });
  }, [profileId]);

  useEffect(() => {
    fetch(`/api/${profileId}/feed`)
      .then((res) => res.json())
      .then((data) => {
        setFeeds(data.tweetsById);
        setIdOrder(data.tweetIds);
      })
      .catch(() => {
        setError(true);
      });
  }, [profileId]);

  if (error === true) {
    return <ErrorGET />;
  }

  return (
    <>
      {!profInfo ? (
        <Loader>
          <ClipLoader />
        </Loader>
      ) : (
        <MainContainer>
          <Banner src={profInfo.bannerSrc} />
          <BelBanner>
            <ProfileImg src={profInfo.avatarSrc} />
            <DoIFollow>
              {profInfo.isBeingFollowedByYou ? (
                <FollowingBtn>Following</FollowingBtn>
              ) : (
                <FollowBtn>Follow</FollowBtn>
              )}
            </DoIFollow>
          </BelBanner>
          <Name>{profInfo.displayName}</Name>
          <HandleCont>
            <Handle>@{profInfo.handle}</Handle>
            <DoTheyFollow>
              {profInfo.isFollowingYou && <FollowsYou>Follows You</FollowsYou>}
            </DoTheyFollow>
          </HandleCont>
          <Bio>{profInfo.bio}</Bio>
          <InfoCont>
            {profInfo.location && (
              <LocationCont>
                <FiMapPin />
                <Location>{profInfo.location}</Location>
              </LocationCont>
            )}
            <JoinedCont>
              <FiCalendar />
              <Joined>
                Joined {format(parseISO(profInfo.joined), "MMMM yyyy")}
              </Joined>
            </JoinedCont>
          </InfoCont>
          <FollowInfo>
            <NumFollowing>{profInfo.numFollowing} </NumFollowing>Following
            <NumFollowers>{profInfo.numFollowers} </NumFollowers>Followers
          </FollowInfo>
          <NavBar>
            <TweetsNav>Tweets</TweetsNav>
            <NavItem>Media</NavItem>
            <NavItem>Likes</NavItem>
          </NavBar>

          <FeedCont>
            {idOrder.map((id) => {
              return (
                <SubFeedCont
                  key={feeds[id].id}
                  onClick={() => {
                    navigate(`/tweet/${feeds[id].id}`);
                  }}
                >
                  <TweetSmall tweetInfo={feeds[id]} />
                </SubFeedCont>
              );
            })}
          </FeedCont>
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

const FeedCont = styled.div`
  display: flex;
  flex-direction: column;
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

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  font-family: sans-serif;
  border-right: 1px solid lightgray;
  border-left: 1px solid lightgray;
`;

const Banner = styled.img``;
////////////////////////////////////
const BelBanner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;
const ProfileImg = styled.img`
  height: 200px;
  width: 200px;
  border-radius: 50%;
  border: white solid 5px;
  margin-top: -125px;
`;
const DoIFollow = styled.div``;
const FollowingBtn = styled.div`
  color: white;
  background-color: ${COLORS.primary};
  font-weight: bold;
  font-size: 20px;
  padding: 15px 20px;
  border-radius: 25px;
`;
const FollowBtn = styled.div`
  color: ${COLORS.primary};
  font-weight: bold;
  font-size: 20px;
  padding: 15px 20px;
  border-radius: 25px;
  border: 3px solid ${COLORS.primary};
`;
/////////////////////////////////////////
const Name = styled.div`
  padding: 0px 20px;
  font-weight: bold;
  font-size: 25px;
`;
///////////////////////////////////////////
const HandleCont = styled.div`
  display: flex;
  padding: 5px 20px;
  align-items: center;
`;
const Handle = styled.div`
  padding-right: 10px;
  font-size: 17px;
  color: #565656;
`;
const DoTheyFollow = styled.div``;
const FollowsYou = styled.div`
  background-color: #eee;
  padding: 3px 7px;
  border-radius: 5px;
  font-size: 15px;
`;
///////////////////////////////////////////////
const Bio = styled.div`
  padding: 20px;
  font-size: 20px;
`;
/////////////////////////////////////////
const InfoCont = styled.div`
  display: flex;
  padding: 0 20px;
  color: #565656;
  font-size: 20px;
`;
const LocationCont = styled.div`
  display: flex;
  margin-right: 20px;
`;
const JoinedCont = styled.div`
  display: flex;
`;
const Joined = styled.div`
  margin-left: 10px;
`;
const Location = styled.div`
  margin-left: 10px;
`;
///////////////////////////////////////////
const FollowInfo = styled.div`
  display: flex;
  padding: 20px;
  font-size: 20px;
`;
const NumFollowing = styled.div`
  margin-right: 10px;
  font-weight: bold;
`;
const NumFollowers = styled.div`
  margin: 0 10px;
  font-weight: bold;
`;
///////////////////////////////////////////////
const NavBar = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 1000px;
`;
const NavItem = styled.div`
  margin: 0;
  text-align: center;
  width: 333px;
  font-size: 20px;
  padding: 20px 0 30px 0;
  font-weight: bold;
  border-bottom: solid 3px lightgray;
`;

const TweetsNav = styled(NavItem)`
  color: ${COLORS.primary};
  border-bottom: solid 3px ${COLORS.primary};
`;
////////////////////////////////////////////////

export default Profile;
