import React, {Component} from 'react';
import axios from 'axios';
import {Video} from "../models/video";
import Settings from "../settings";

export class VideolistComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      available_videos: null
    };
    axios.get(Settings.VIDEO_DIRECTORY_URI)
      .then((response) => {
        let tmpDOM = document.createElement('div');
        tmpDOM.innerHTML = response.data;
        let content_rows = Array.from(tmpDOM.querySelectorAll("tr")).slice(3,-1);
        let videos = content_rows.map((row_element) => {
          //the-disaster-artist-trailer-2_h1080p.mov
          let filename = row_element.querySelector("td:nth-child(2) > a").getAttribute('href');
          let modtime = row_element.querySelector("td:nth-child(3)").innerHTML;
          let filesize = row_element.querySelector("td:nth-child(4)").innerHTML;

          let title = filename
              .split('_').slice(0,-1).join(' ')                                               // Clip title
              .split('-').join(' ')                                                           // Replace -'s with whitespace
              .split('').map((char, idx) => (idx === 0 ? char.toUpperCase() : char)).join('') // Capitalize
            + ` ${filename.indexOf('h1080') > -1 ? 'HD' : 'LOWRES'}`                          // Append resolution
            + ` (${filesize.trim()})`;                                                        // Append filesize
          return new Video(
            title,
            Settings.VIDEO_DIRECTORY_URI + filename,
            ''
          );
        });
        this.setState({available_videos: videos})
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="Videolist">
        {/* has this.props.changeVideo(video_class_instance) */}
        {this.state.available_videos === null ?
          <p>Loading</p>
          :
          !this.state.available_videos ?
            <p>No videos found</p>
            :
            this.state.available_videos.map(
              (video) => <button key={video.source} onClick={()=>this.props.changeVideo(video)}>{video.name}</button>
            )
        }
      </div>
    );
  }

}