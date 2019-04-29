import React from "react";
import styled from "styled-components";

const Logo = styled.header`
  font-weight: 800;
  font-size: 55px;
  vertical-align: middle;
`;

const Input = styled.input`
  width: 410px;
  font-size: 14px;
  padding: 15px;
  margin: 40px 0px;
`;

const Help = styled.div`
  text-align: left;
  font-weight: 400;
`;

const UnderLine = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;

const Span = styled.span`
  display: block;
  font-size: 48px;
  line-height: 80px;

  &:first-child {
    font-weight: 800;
    border-bottom: 4px solid black;
  }

  &:last-child {
    text-align: right;
  }
`;

const P = styled.p`
  margin: 10px 0px;
  font-size: 16px;
  line-height: 28px;
`;

const MainPresenter = () => (
  <>
    <Logo>
      <i
        className="fab fa-youtube"
        style={{ color: "red", marginRight: "20px" }}
      />
      스트리밍 미터
    </Logo>
    <Input type="text" placeholder="Youtube 제목 또는 주소를 입력해주세요." />
    <Help>
      <UnderLine>
        <Span>최애는</Span>
        <Span>쌓이는 것.</Span>
      </UnderLine>

      <P>우리의 시간은 아티스트에게 얼마나 쌓였을까요?</P>
      <P>
        <span style={{ color: "orangered", fontWeight: "800" }}>
          스트리밍 미터
        </span>
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
