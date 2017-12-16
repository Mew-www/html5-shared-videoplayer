import React, {Component} from "react";
import axios from 'axios';
import Settings from '../settings';

export class CurrentroomComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      room: props.room
    };
  }

  /*
    Override state.room on receiving props, if:
      previous state.room was "falsy" (null or so)
      previous state.room.id was different than new props' room.id
   */
  componentWillReceiveProps(next_props) {
    if (!this.state.room || this.state.room.id !== next_props.room.id) {
      this.setState({room: next_props.room});
    }
  }

  render() {
    console.log(this.state.room);
    return (
      <div className="CurrentroomWrapper">
        {this.state.room ?
          <div className="Currentroom">
            <pre>
              {JSON.stringify(this.state.room)}
            </pre>
          </div>
          :
          <p>Not yet authenticated to any room. Choose one from room list (or if there are none, create one).</p>
        }
      </div>
    );
  }

}