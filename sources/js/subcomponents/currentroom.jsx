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

  render() {
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