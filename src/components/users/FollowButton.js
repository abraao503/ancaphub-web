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
  const verifyIfIsOwnProfile =
    auth.isAuthenticated && auth.user.username === user;

  const [following, setFollowing] = React.useState(null);

  const handleFollow = () => {
    dispatch(followUserRequest(user));
    setFollowing(true);
  };

  const handleUnfollow = () => {
    dispatch(unfollowUserRequest(user));
    setFollowing(false);
  };

  React.useEffect(() => {
    if (relationship.following) {
      setFollowing(true);
    }
  }, [setFollowing, relationship]);

  if (verifyIfIsOwnProfile) {
    return null;
  }

  const getText = (isFollowing, followedBy) => {
    if (isFollowing) {
      return <FormattedMessage id="common.following" />;
    }
    if (!isFollowing && followedBy) {
      return <FormattedMessage id="common.followBack" />;
    }
    if (!isFollowing) {
      return <FormattedMessage id="common.follow" />;
    }

    return <></>;
  };

  return (
    <Button
      color="primary"
      size="small"
      variant={following ? 'normal' : 'outlined'}
      onClick={following ? handleUnfollow : handleFollow}
    >
      {getText(following, state.followed_by)}
    </Button>
  );
};
