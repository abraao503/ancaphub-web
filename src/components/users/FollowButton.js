import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Button } from '../ui';
import {
  followUserRequest,
  unfollowUserRequest,
} from '../../actions/relationships';

export default ({ user }) => {
  const dispatch = useDispatch();
  const state = useSelector((relState) => relState.relationships[user]);
  const relationship = state || {};
  const auth = useSelector((authState) => authState.auth);
  const verifyIfIsOwnProfile = auth.isAuthenticated && auth.user._id === user;

  const handleFollow = () => {
    dispatch(followUserRequest(user));
  };

  const handleUnfollow = () => {
    dispatch(unfollowUserRequest(user));
  };

  if (verifyIfIsOwnProfile) {
    return null;
  }
  return (
    <Button
      color="primary"
      size="small"
      variant={relationship.following ? 'normal' : 'outlined'}
      onClick={relationship.following ? handleUnfollow : handleFollow}
    >
      {relationship.following ? (
        <FormattedMessage id="common.following" />
      ) : (
        <FormattedMessage id="common.follow" />
      )}
    </Button>
  );
};
