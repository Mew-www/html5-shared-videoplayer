import React, {Component} from "react";
import {AuthenticatedRoom} from "../models/room";
import axios from 'axios';
import Settings from '../settings';

export class CurrentroomComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      room: props.room,
      editable_pin: props.room.pin
    };
  }

  reloadRoom() {
    axios.get(Settings.SINGLE_ROOM_URI(this.state.room.id), {withCredentials: true})
      .then((room_response) => {
        this.setState({room: new AuthenticatedRoom(room_response.data)});
      });
  }

  updateRoom({pin, description, video, playing, videotime, controller, control_requested}) {
    let modified_room = {};
    if (pin) {
      modified_room['pin'] = pin;
    }
    if (description) {
      modified_room['description'] = description;
    }
    if (video) {
      modified_room['video'] = video;
    }
    if (playing) {
      modified_room['playing'] = playing;
    }
    if (videotime) {
      modified_room['videotime'] = videotime;
    }
    if (controller) {
      modified_room['controller'] = true;
    }
    if (control_requested) {
      modified_room['control_requested'] = true;
    }
    axios.post(Settings.SINGLE_ROOM_URI(this.state.room.id), modified_room, {withCredentials: true})
      .then((room_updated_response) => {
        this.reloadRoom();
      })
      .catch((error) => {
        console.log(error)
      });
  }

  /*
    Override state.room on receiving props, if state.room.id is different than new props' room.id
   */
  componentWillReceiveProps(next_props) {
    if (this.state.room.id !== next_props.room.id) {
      this.setState({room: next_props.room});
    }
  }

  render() {
    return (
      <div className="Currentroom">
        <p className="Currentroom__header">
          <span>{this.state.room.description} (room#{this.state.room.id})</span>
          <span> | </span>
          <label>
            <span>PIN: </span>
            <input type="text"
                   value={this.state.editable_pin}
                   onChange={(e) => {this.setState({editable_pin: e.target.value});}}
                   className={
                     "Currentroom__pin"
                     + (Number(this.state.editable_pin)===Number(this.state.room.pin) ? "" : " Currentroom__pin--modified")
                   }/>
            {Number(this.state.editable_pin)===Number(this.state.room.pin) ?
              ""
              :
              <span>
                <button onClick={(e) => {this.updateRoom({pin: this.state.editable_pin});}}>
                  Save
                </button>
                <button onClick={(e) => {this.setState({editable_pin: this.state.room.pin});}}>
                  Revert
                </button>
                <span className="modified-indicator"> (modified)</span>
              </span>}
          </label>
        </p>
      </div>
    );
  }

}