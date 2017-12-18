import React, {Component} from "react";
import {RoomlistComponent} from "./roomlist";
import {CurrentroomComponent} from "./currentroom";

export class AppComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated_room: null
    };
  }

  render() {
    return (
      <div className="App">
        <RoomlistComponent changeRoom={(authed_room)=>{this.setState({authenticated_room: authed_room});}}
                           current_room={this.state.authenticated_room}/>
        <div className="App__current-room">
          {this.state.authenticated_room ?
            <CurrentroomComponent room={this.state.authenticated_room}/>
            :
            <p>Not yet authenticated to any room. Choose one from room list (or if there are none, create one).</p>
          }
        </div>
      </div>
    );
  }

}