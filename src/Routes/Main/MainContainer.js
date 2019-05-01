import React, { Component } from "react";
import MainPresenter from "./MainPresenter";
import axios from "axios";

class MainContainer extends Component {
  state = {
    searched: false,
    searchResult: null
  };

  validateKeyword = value => {
    if (
      value.startsWith("http://") ||
      value.startsWith("https://") ||
      value.includes(".be") ||
      value.includes(".com")
    ) {
      return true;
    } else {
      return false;
    }
  };

  getYouTubeID = url => {
    var ID = "";
    url = url
      .replace(/(>|<)/gi, "")
      .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

    if (url[2] !== undefined) {
      ID = url[2].split(/[^0-9a-z_\-]/i);
      ID = ID[0];
    } else {
      ID = url;
    }

    return ID;
  };

  searchKeyword = keyword => {
    const url = encodeURI(
      `https://www.googleapis.com/youtube/v3/search?fields=items(snippet(title,channelTitle,thumbnails/default),id/videoId)&part=snippet&q=${keyword}&key=${
        process.env.REACT_APP_KEY
      }&maxResults=5&type=video`
    ); // type지정 안 해주면 공식 채널 영상이 나오는 게 결과값에 videoID값이 없다

    axios({
      url,
      method: "GET"
    }).then(
      response => {
        if (response.status === 200) {
          const data = response.data;

          for (let item of data.items) {
            item.snippet.title = item.snippet.title
              .replace(/&amp;/g, "&")
              .replace(/&#39;/g, "'");
          }

          if (data.items.length === 0) {
            alert("검색 결과가 없습니다 !");
          } else {
            this.setState({
              searched: true,
              searchData: data.items
            });
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  };

  validateForm = e => {
    e.preventDefault();
    const inputValue = document.getElementById("link_input").value;

    if (this.validateKeyword(inputValue)) {
      this.searchKeyword(this.getYouTubeID(inputValue));
    } else {
      if (inputValue.trim() === "") {
        alert("검색값이 없습니다!");
      } else {
        this.searchKeyword(inputValue);
      }
    }
  };

  render() {
    const { searched, searchData } = this.state;

    return (
      <MainPresenter
        check={this.validateForm}
        searched={searched}
        searchData={searchData}
      />
    );
  }
}

export default MainContainer;
