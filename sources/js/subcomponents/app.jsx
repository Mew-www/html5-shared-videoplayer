import React, {Component} from "react";
import {VideoplayerComponent} from "./videoplayer";
import {Video} from "../models/video";
import {VideolistComponent} from "./videolist";
import {RoomlistComponent} from "./roomlist";
import {CurrentroomComponent} from "./currentroom";

export class AppComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated_room: null,
      active_video: null
    };
  }

  render() {
    return (
      <div className="App">
        <RoomlistComponent changeRoom={(authed_room)=>{this.setState({authenticated_room: authed_room});}}/>
        <VideolistComponent changeVideo={(selected_video)=>{this.setState({active_video: selected_video});}}/>
        <CurrentroomComponent room={this.state.authenticated_room}/>
        <VideoplayerComponent video={this.state.active_video}/>
      </div>
    );
  }

}