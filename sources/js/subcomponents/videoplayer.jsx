import React, {Component} from 'react';

export class VideoplayerComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      this.props.video ?
        <div className="Videoplayer">
          <p>{this.props.video.name}</p>
          <video preload="metadata" controls="controls" src={this.props.video.source}>
            Your browser does not support HTML5 standard &lt;video&gt; tag.
          </video>
        </div>
        :
        <p>
          Waiting for a video.
        </p>
    );
  }
}