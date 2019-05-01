import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Rabbit from "../../rabbit.png";

const fadeIn = keyframes`
  from {
    opacity:0;
  }

  to {
    opacity:1;
  }
`;

const RabbitAnim = keyframes`
  from {
    transform: rotate(-2deg);
  }

  to {
    transform: rotate(2deg);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 2s ease;

  div {
    padding: 20px 0px;
  }
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const TotalYear = styled.div`
  font-size: 36px;
  font-weight: 800;
`;

const HowLong = styled.div`
  line-height: 32px;
  font-weight: 700;
  font-size: 16px;
  color: #666;

  span {
    display: inline-block;
    border-bottom: 2px dotted #c3c3c3;
  }
`;

const Frequency = styled.div`
  color: white;
  background-color: #353535;
  margin-bottom: 50px;
`;

const NowContainer = styled.div`
  margin-top: 20px;
`;

const Now = styled.div`
  margin-top: 40px;
  border-top: 2px solid #666;
  padding: 20px !important;
  font-weight: 700;
  display: inline-block;
`;

const RespContainer = styled.div`
  position: relative;
  overflow: hidden;
  padding-bottom: 0 !important;
  padding-top: 56.25% !important;
  margin: 40px;
  box-shadow: 0px 4px 10px #444;
`;

const RespIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
`;

const Image = styled.img`
  width: 600px;
  height: 400px;
  align-self: center;
  animation: ${RabbitAnim} 0.1s linear infinite;
`;

const RecommendContainer = styled.div``;

const RecommendLabel = styled.div`
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 10px;
`;

const RecommendVideo = styled.div`
  width: 175px;
  display: inline-block;
  border: 1px solid #ddd;
  vertical-align: top;
  border-top: 0px;
  padding: 0px !important;
  background: white;
  margin: 0px 10px;
  line-height: 24px;

  img {
    vertical-align: bottom;
    width: 175px;
  }
`;

const RecommendText = styled.div`
  padding: 10px 15px !important;
  font-size: 12px;
`;

const Ballon = styled.div`
  display: inline-block;
  position: relative;
  background: #353535;
  color: white;
  border: 2px solid #353535;
  border-radius: 4px;
  width: 120px;
  margin: 0 auto 10px;
  font-weight: 700;

  &::after {
    content: "";
    position: absolute;
    border-top: 8px solid #353535;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    bottom: -9px;
    left: 5px;
  }
`;

const ResultPresenter = ({ resultData, relatedData }) => (
  <Container>
    <Title>{resultData.title}</Title>
    <TotalYear>총 {resultData.total_caption} 재생되었습니다.</TotalYear>
    <HowLong>
      재생된만큼 과거로 가면 <span>{resultData.past_year}년</span>까지 갈 수
      있어요 ! <br />
      가장 가까운 사건은 <span>{resultData.approximateData.accident}</span> (
      {resultData.approximateData.year}년) 입니다.
    </HowLong>
    <Frequency>
      지금도... {resultData.frequency}번꼴로 재생되고 있습니다 !
    </Frequency>
    <Ballon>호고곡..</Ballon>
    <Image src={Rabbit} alt="rabbit" />
    <NowContainer>
      <div>▼ ▼ ▼ ▼ ▼</div>
      <Now>{resultData.now} 기준</Now>
    </NowContainer>

    <RespContainer>
      <RespIframe
        className="resp-iframe"
        id="youtube"
        width="1040"
        height="585"
        src={`https://www.youtube.com/embed/${resultData.id}`}
        frameborder="0"
        allow="encrypted-media"
        allowfullscreen="allowfullscreen"
      />
    </RespContainer>

    <RecommendContainer>
      <RecommendLabel>관련있는 영상들은 어떠세요?</RecommendLabel>
      {relatedData.map(data => (
        <RecommendVideo key={data.id.videoId}>
          <a href={`${process.env.PUBLIC_URL}/result/${data.id.videoId}`}>
            <img
              src={data.snippet.thumbnails.medium.url}
              alt="Related Video Thumbnail"
            />
            <RecommendText>{data.snippet.title}</RecommendText>
          </a>
        </RecommendVideo>
      ))}
    </RecommendContainer>
  </Container>
);

export default ResultPresenter;
