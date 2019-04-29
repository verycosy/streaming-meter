import React from "react";
import styled, { keyframes } from "styled-components";

const Logo = styled.header`
  font-weight: 800;
  font-size: 55px;
  margin-bottom: 40px;
`;

const Input = styled.input`
  width: 425px;
  font-size: 14px;
  padding: 15px;
  outline: none;
`;

const fadeIn = keyframes`
  from {
    opacity:0;
  }
  to {
    opacity:1;
  }
`;

const SearchBtn = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  position: absolute;
  margin-top: 16px;
  margin-left: 175px;

  i {
    color: #353535;
  }
`;

const Help = styled.div`
  display: inline-block;
  width: 425px;
  text-align: left;
  font-weight: 400;
  animation: ${fadeIn} 2s ease;
  margin-top: 40px;
`;

const UnderLine = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;

const LeftAnim = keyframes`
  from {
    margin-right:50%;
  }

  to {
    margin-right:0;
  }
`;

const RightAnim = keyframes`
  from {
    margin-left:50%;
  }

  to {
    margin-left:0;
  }
`;

const LineAnim = keyframes`
  from {
    width:0;
  }

  to {
    width:100%;
  }
`;

const Line = styled.div`
  height: 4px;
  background-color: black;
  animation: ${LineAnim} 1s ease forwards;
  align-self: center;
`;

const Span = styled.span`
  font-size: 48px;
  line-height: 80px;

  &:first-child {
    align-self: flex-start;
    font-weight: 800;
    animation: ${RightAnim} 1s ease forwards;
  }

  &:last-child {
    align-self: flex-end;
    animation: ${LeftAnim} 1s ease forwards;
  }
`;

const P = styled.p`
  margin: 10px 0px;
  font-size: 16px;
  line-height: 28px;

  span {
    color: orangered;
    font-weight: 800;
  }
`;

const SearchResults = styled.div`
  position: relative;
  background-color: white;
  width: 425px;
  text-align: left;
  display: inline-block;
  box-sizing: border-box;
`;

const ResultItem = styled.div`
  display: flex;
  min-height: 90px;
  padding: 15px;
  border: 1px solid #ddd;
  line-height: 24px;

  img {
    margin-right: 15px;
  }
`;

const ResultTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: black;
  line-height: 18px;
`;

const ResultChannel = styled.div`
  font-weight: normal;
  margin-top: 10px;
  font-size: 12px;
  color: #666;
`;

const MainPresenter = ({ check, searched, searchData }) => (
  <>
    <div>
      <Logo>
        <i
          className="fab fa-youtube"
          style={{ color: "red", marginRight: "20px" }}
        />
        스트리밍 미터
      </Logo>
      <SearchBtn onClick={check}>
        <i className="fas fa-search" />
      </SearchBtn>
      <form onSubmit={check}>
        <Input
          type="text"
          placeholder="Youtube 제목 또는 주소를 입력해주세요."
          id="link_input"
        />
      </form>
      {searched ? (
        <SearchResults>
          {searchData.map(data => (
            <a href={`/result/${data.id.videoId}`} key={data.id.videoId}>
              <ResultItem>
                <img
                  src={data.snippet.thumbnails.default.url}
                  alt="Search Result"
                />
                <ResultTitle>
                  {data.snippet.title}
                  <ResultChannel>{data.snippet.channelTitle}</ResultChannel>
                </ResultTitle>
              </ResultItem>
            </a>
          ))}
        </SearchResults>
      ) : null}
    </div>

    <Help>
      <UnderLine>
        <Span>최애는</Span>
        <Line />
        <Span>쌓이는 것.</Span>
      </UnderLine>

      <P>우리의 시간은 아티스트에게 얼마나 쌓였을까요?</P>
      <P>
        <span>스트리밍 미터</span>
        는 입력받은 유튜브 영상의 재생된 시간을 총합해
        <br />
        역주행하면 어디까지 과거로 갈 수 있는지 알려드립니다.
      </P>
      <P>
        내 아티스트의 작품에 얼마나 많은 이들의 시간이 쌓였는지 <br />
        확인해보세요 !
      </P>
    </Help>
  </>
);

export default MainPresenter;
