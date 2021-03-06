import React, { useState, useEffect, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner, Container, Hero } from '../../components/ui';

import { UserCardGrid } from './styles.css';

import { getUsersRequest, loadMoreUsersRequest } from '../../actions/users';
import UserCard from '../../components/users/UserCard';

const Users = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.users);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getUsersRequest());
  }, [dispatch]);

  const loadMore = useCallback(() => {
    setPage(page + 1);
    dispatch(loadMoreUsersRequest({ page: page + 1 }));
  }, [dispatch, page]);

  return (
    <Container>
      <Hero title={<FormattedMessage id="common.users" />} />
      <div style={{ marginTop: 16 }}>
        <InfiniteScroll
          dataLength={items.length} // This is important field to render the next data
          next={loadMore}
          hasChildren
          hasMore={page * 20 < 254}
          loader={
            <div
              style={{
                width: '100%',
                justifyContent: 'center',
                display: 'flex',
                padding: 16,
              }}
            >
              <Spinner />
            </div>
          }
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <UserCardGrid>
            {items.map((user) => (
              <UserCard user={user.user} key={user._id} />
            ))}
          </UserCardGrid>
        </InfiniteScroll>
      </div>
    </Container>
  );
};

export default Users;
