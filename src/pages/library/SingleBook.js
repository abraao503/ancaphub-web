import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FiDownload as DownloadIcon } from 'react-icons/fi';

import {
  Paper,
  Container,
  Button,
  LoadContent,
  Dropdown,
  DropdownListContainer,
  DropdownListItem,
} from '../../components/ui';

import defaultThumbnail from '../../assets/default-book-cover.jpg';
import Categories from '../../components/categories/ShowCategories';

import { BookDisplayContainer, BookDisplayGrid } from './styles.css';

import { getSingleItemRequest as getSingleItem } from '../../actions/library';

const Title = styled.h2`
  font-weight: bold;
  color: ${(props) => props.theme.palette.text.contrast};
  font-size: 2.125rem;
  margin-bottom: 5px;
`;

const Author = styled.h3`
  font-weight: lighter;
  color: ${(props) => props.theme.palette.text.contrast};
  font-size: 1.25rem;
  margin-bottom: 34px;
`;

const BookCover = styled.img`
  width: 100%;
  @media only screen and (max-width: 768px) {
    height: 240px;
    object-fit: cover;
  }
`;

const Banner = styled.div`
  background: url(${(props) => (props.cover ? props.cover : defaultThumbnail)})
    rgba(0, 0, 0, 0.5);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  width: 100%;
  height: 230px;

  &:after {
    height: 230px;
    width: 100%;

    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 1) 100%
    );
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.7;
  }
`;

function SingleBook() {
  const { id } = useParams();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getSingleItem({ itemId: id }));
  }, [dispatch, id]);

  const { singleItem, loading } = useSelector((state) => state.library);

  return (
    <LoadContent loading={loading}>
      <Banner
        cover={
          singleItem && singleItem.cover
            ? singleItem.cover.url
            : defaultThumbnail
        }
      />
      <BookDisplayContainer>
        <Container>
          <BookDisplayGrid>
            <div>
              <Paper>
                <BookCover
                  src={
                    singleItem && singleItem.cover
                      ? singleItem.cover.url
                      : defaultThumbnail
                  }
                />
                <div style={{ padding: 10 }}>
                  <Dropdown
                    toggle={
                      <Button fullwidth color="secondary">
                        <FormattedMessage id="common.download" />
                      </Button>
                    }
                    placement="top"
                  >
                    <DropdownListContainer>
                      {singleItem.files &&
                        singleItem.files.map((file) => (
                          <DropdownListItem
                            icon={<DownloadIcon />}
                            key={file.originalname}
                          >
                            <a href={file.url} target="_blanck">
                              {file.originalname}
                            </a>
                          </DropdownListItem>
                        ))}
                    </DropdownListContainer>
                  </Dropdown>
                </div>
              </Paper>
              {/* <InvitedBy user={user} /> */}
            </div>
            <div>
              <div style={{ marginBottom: 8 }}>
                <Categories categories={singleItem.categories} />
              </div>

              <Title>{singleItem && singleItem.title}</Title>
              <Author>{singleItem && singleItem.author}</Author>
              <div>{singleItem && singleItem.content}</div>
              <div my={2}>{/* <Ratings item={book.item} /> */}</div>
            </div>
          </BookDisplayGrid>
        </Container>
      </BookDisplayContainer>
    </LoadContent>
  );
}

export default SingleBook;
