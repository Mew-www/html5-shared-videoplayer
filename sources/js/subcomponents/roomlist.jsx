import React, {Component} from 'react';
import axios from 'axios';
import Settings from '../settings';
import {UnauthenticatedRoom} from "../models/room";

export class RoomlistComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      available_rooms: null
    };
    axios.get(Settings.ROOMS_URI)
      .then((response) => {
        let rooms_json = response.data;
        this.setState({
          available_rooms: rooms_json.map((room_json) => new UnauthenticatedRoom(room_json))
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="Roomlist">
        {this.state.available_rooms === null ?
          <p>Loading</p>
          :
          !this.state.available_rooms ?
            <p>No rooms found</p>
            :
            this.state.available_rooms.sort((room1, room2) => room1.id - room2.id).map(
              (room) => {
                return (
                  <div key={room.id} className="Roomlist__itemwrapper">
                    <div className="Roomlist__item">
                      <p className="Roomlist__item-description">{room.description}</p>
                      <p className="Roomlist__item-id">Room {room.id}</p>
                      <p className="Roomlist__item-video">
                        {room.video ?
                          <span><i class="material-icons">&#xE8DA;</i> {room.video}</span>
                          :
                          `No video playing`}
                      </p>
                    </div>
                    <div className="Roomlist__create-item-btn"></div>
                  </div>
                );
              }
            )
        }
      </div>
    );
  }

}