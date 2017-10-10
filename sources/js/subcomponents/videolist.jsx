import React, {Component} from 'react';
import axios from 'axios';

export class VideolistComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      available_videos: []
    };
    axios.get('http://62.78.180.5/streamprojekti/')
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="Videolist">
        {/* has this.props.changeVideo(video_class_instance) */}
        <button>todo generate these</button>
      </div>
    );
  }

}