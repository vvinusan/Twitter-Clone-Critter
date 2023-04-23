import styled from "styled-components";
import { FiMessageCircle } from "react-icons/fi";
import { FiRepeat } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { FiUpload } from "react-icons/fi";
import { useState } from "react";

const TweetActions = () => {
  const [liked, setLiked] = useState(false);
  const [numOfLikes, setNumOfLikes] = useState(0);

  const handleLike = () => {
    setLiked(true);
    setNumOfLikes(numOfLikes + 1);
  };
  const handleDislike = () => {
    setLiked(false);
    setNumOfLikes(numOfLikes - 1);
  };

  return (
    <MainContainer>
      <Comment>
        <FiMessageCircle />
      </Comment>
      <Retweet>
        <FiRepeat />
      </Retweet>

      {liked && numOfLikes === 1 ? (
        <Liked>
          <DislikeBtn
            onClick={(event) => {
              event.stopPropagation();
              handleDislike();
            }}
          >
            <FiHeart style={{ fill: "red" }} />
          </DislikeBtn>
          <NumLikes>{numOfLikes}</NumLikes>
        </Liked>
      ) : (
        <NotLiked>
          <LikeBtn
            onClick={(event) => {
              event.stopPropagation();
              handleLike();
            }}
          >
            <FiHeart />
          </LikeBtn>
        </NotLiked>
      )}
      <Share>
        <FiUpload />
      </Share>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  font-family: sans-serif;
  font-size: 20px;
`;
const Comment = styled.div`
  padding: 10px 110px;
`;
const Retweet = styled.div`
  padding: 10px 110px;
`;

const Liked = styled.div`
  padding: 10px 110px;
  color: red;
  display: flex;
  align-items: center;
  position: relative;
`;
const NotLiked = styled.div`
  padding: 10px 110px;
  display: flex;
  align-items: center;
  color: black;
`;
const NumLikes = styled.div`
  margin-left: 10px;
  position: absolute;
  left: 55%;
`;

const DislikeBtn = styled.button`
  border: none;
  background-color: transparent;
  align-content: center;
  padding: 5px 5px 0px 5px;
  color: red;
  font-size: 20px;
  &:hover {
    border-radius: 50%;
    background-color: rgb(255, 0, 0, 0.3);
  }
`;

const LikeBtn = styled.button`
  align-content: center;
  border: none;
  font-size: 20px;
  background-color: transparent;
  padding: 5px 5px 0px 5px;
  &:hover {
    border-radius: 50%;
    background-color: rgb(255, 0, 0, 0.3);
    color: red;
  }
`;

const Share = styled.div`
  padding: 10px 110px;
`;
export default TweetActions;
