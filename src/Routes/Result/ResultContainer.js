import React, { Component } from "react";
import ResultPresenter from "./ResultPresenter";
import axios from "axios";
import DB from "../../DB";

class ResultContainer extends Component {
  constructor(props) {
    super(props);

    const {
      match: {
        params: { id }
      }
    } = props;

    this.state = {
      id,
      loading: true,
      resultData: null,
      relatedData: null
    };
  }

  getSeconds = duration => {
    const arr = duration.split("H");
    let arr2, tmp;

    if (arr.length === 2) {
      arr2 = arr[1].split("M");
      tmp = Number(arr[0]) * 3600 + Number(arr2[0]) * 60 + Number(arr2[1]);
    } else {
      arr2 = duration.split("M");
      if (arr2.length === 2) {
        tmp = Number(arr2[0]) * 60 + Number(arr2[1]);
      } else {
        tmp = Number(duration);
      }
    }

    return tmp;
  };

  getApproximateData = past_year => {
    const result = DB;

    let min = Number.MAX_SAFE_INTEGER;
    let min_index = 0;

    for (let i = 0; i < result.length; i++) {
      const my_year = result[i].year;
      const gap = Math.abs(past_year - my_year);

      if (min > gap) {
        min = gap;
        min_index = i;
      }
    }

    return result[min_index];
  };

  async componentDidMount() {
    const { id } = this.state;

    let resultData;
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${
      process.env.REACT_APP_KEY
    }&fields=items(snippet(title,publishedAt),contentDetails(duration),statistics(viewCount))&part=snippet,contentDetails,statistics`;

    await axios({
      url,
      method: "GET"
    }).then(
      response => {
        if (response.status === 200) {
          let videoData = response.data.items;

          if (videoData.length > 0) {
            videoData = videoData[0];
            const now = new Date();
            const title = videoData["snippet"]["title"];
            const uploadedDate = videoData["snippet"]["publishedAt"];
            const uploadedYear = Number(uploadedDate.substring(0, 4));
            const viewCount = Number(videoData["statistics"]["viewCount"]);
            const seconds = this.getSeconds(
              videoData["contentDetails"]["duration"]
                .replace("PT", "")
                .replace("S", "")
            );

            const total_seconds = viewCount * seconds;
            const this_year = now.getFullYear();

            const total_day = total_seconds / 86400;
            const total_year = Math.round(total_day / 365);

            let year_gap = this_year - uploadedYear;
            if (year_gap === 0) year_gap = 1;

            const date_second_diff =
              (now.getTime() - new Date(uploadedDate).getTime()) / 1000;

            let one_second = viewCount / date_second_diff;
            const one_hour = (one_second * 3600).toFixed(1);
            one_second = one_second.toFixed(1);

            let past_year = Math.round(Number(this_year - total_year));

            var approximateData = this.getApproximateData(past_year);
            approximateData.year = String(approximateData.year).replace(
              "-",
              "B.C. "
            );

            //캡션과 연도 절대값 처리
            past_year = String(past_year).replace("-", "B.C. ");
            const total_caption =
              total_year === 0
                ? Math.round(total_day) + "일"
                : total_year + "년";
            const frequency =
              one_second === 0 ? "1시간에 " + one_hour : "1초에 " + one_second;

            resultData = {
              id,
              title,
              total_caption,
              past_year,
              approximateData,
              frequency,
              now: new Date().toLocaleString().replace(/-/gi, ".")
            };
          } else {
            console.log("No Search Result");
          }
        }
      },
      error => {
        console.log("Youtube Server Error");
      }
    );

    const relatedUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&&regionCode=kr&relatedToVideoId=${id}&type=video&key=${
      process.env.REACT_APP_KEY
    }&fields=items(id/videoId,snippet(title,thumbnails/medium))`; //&regionCode=kr

    await axios({
      url: relatedUrl,
      method: "GET"
    }).then(
      response => {
        if (response.status === 200) {
          this.setState({
            resultData,
            relatedData: response.data.items,
            loading: false
          });
          // 관련 있는 비디오가 없을 수가 없다*/
        } else {
          console.log("Youtube Server Error");
        }
      },
      error => console.log("Youtube Server Error")
    );
  }

  render() {
    const { loading, relatedData, resultData } = this.state;
    return loading ? (
      "Loading..."
    ) : (
      <ResultPresenter relatedData={relatedData} resultData={resultData} />
    );
  }
}

export default ResultContainer;
