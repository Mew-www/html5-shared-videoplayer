import React, {Component} from "react";
import {VideoplayerComponent} from "./videoplayer";
import {Video} from "../models/video";
import {VideolistComponent} from "./videolist";
import {RoomlistComponent} from "./roomlist";

let bbb = new Video("testi", "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4", "");

export class AppComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active_video: null
    };
  }

  render() {
    return (
      <div className="App">
        <RoomlistComponent/>
        <VideolistComponent changeVideo={(selected_video)=>{this.setState({active_video: selected_video});}}/>
        <VideoplayerComponent video={this.state.active_video}/>
      </div>
    );
  }

}