import React from 'react';
import styled from 'styled-components';
import { FiMapPin as DistanceIcon } from 'react-icons/fi';
import { Paper } from '../ui';
import FollowButton from './FollowButton';
import UserAvatar from './UserAvatar';
import UserName from './UserName';

const UserCardWrap = styled(Paper)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  .avatar,
  .username,
  .distance {
    margin-bottom: 8px;
  }
  .username {
    color: ${(props) => props.theme.palette.text.secondary};
    font-size: 0.8em;
    line-height: 100%;
    margin-bottom: 16px;
  }

  a {
    display: block;
  }

  .distance {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    svg {
      color: ${(props) => props.theme.palette.secondary};
    }
  }
`;

const UserCard = ({ user }) => (
  <UserCardWrap padding>
    <div className="avatar">
      <UserAvatar user={user} size="80" />
    </div>
    <UserName user={user} />
    <span className="username">@{user.username}</span>
    {(user.dist || user.dist === 0) && (
      <div className="distance">
        <DistanceIcon />
        <span>{`${(user.dist / 1000).toFixed(0)} Km`}</span>
      </div>
    )}
    <FollowButton user={user.username} />
  </UserCardWrap>
);

export default UserCard;
