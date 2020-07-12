import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import Categories from '../../components/categories/ShowCategories';

import { Container } from '../../components/ui';

import { getSingleItemRequest as getSingleItem } from '../../actions/library';

const PlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;

  .videoPlayer {
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.7);
  }
`;

const Banner = styled.div`
  background: ${(props) => props.theme.palette.paperDark};
  width: 100%;
  padding-top: 32px;
  padding-bottom: 32px;
`;

const Title = styled.h2`
  font-weight: bold;
  color: ${(props) => props.theme.palette.text.secondary};
  margin-top: 1em;
`;

const Author = styled.h3`
  font-weight: lighter;
  color: ${(props) => props.theme.palette.text.secondary};
`;

const VideoContentContainer = styled.div`
  padding: 1em 1em 1em 0;
  max-width: 1024px;
  margin: auto;
  margin-bottom: 1em;
  @media only screen and (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    padding: 1em;
  }
`;

const SingleVideo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getSingleItem({ itemId: id }));
  }, [dispatch, id]);

  const { singleItem } = useSelector((state) => state.library);

  return (
    singleItem && (
      <>
        <Banner>
          <Container>
            <PlayerWrapper>
              <ReactPlayer
                className="videoPlayer"
                width="100%"
                height="100%"
                url={singleItem.extraFields && singleItem.extraFields.videoUrl}
                controls
                config={{
                  youtube: {
                    playerVars: {
                      fs: 1,
                    },
                  },
                }}
              />
            </PlayerWrapper>
            <div style={{ marginTop: 32 }}>
              <Categories categories={singleItem.categories} />

              <Title>{singleItem.title}</Title>
              <Author>
                <FormattedMessage
                  id="library.videos.participants"
                  values={{ participants: singleItem.author }}
                />
              </Author>
            </div>
          </Container>
        </Banner>
        <VideoContentContainer>{singleItem.content}</VideoContentContainer>
      </>
    )
  );
};

export default SingleVideo;
