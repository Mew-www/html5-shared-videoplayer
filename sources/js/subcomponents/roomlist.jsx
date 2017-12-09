import React, {Component} from 'react';
import axios from 'axios';
import Settings from '../settings';
import {AuthenticatedRoom, UnauthenticatedRoom} from "../models/room";

export class RoomlistComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      available_rooms: null,
      is_creating: false,
      new_room_pin: '',
      new_room_description: ''
    };
  }

  reloadRooms() {
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

  createRoom() {
    let pin = this.state.new_room_pin;
    let description = this.state.new_room_description;
    axios.post(Settings.ROOMS_URI, {'pin': pin, 'description': description})
      .then((response) => {
        // Reset input controls
        this.setState({
          new_room_pin: '',
          new_room_description: '',
          is_creating: false
        });
        // Reload list
        this.reloadRooms();
        // Inform user
        alert('Your room was successfully created!');
      })
      .catch((error) => {
        console.log(error);
      })
  }

  authenticateRoom(room_id) {
    let input_pin = prompt('PIN');
    axios.post(Settings.ROOM_AUTH_URI, {'room': room_id, 'pin': input_pin})
      .then((auth_response) => {
        axios.get(Settings.SINGLE_ROOM_URI(room_id))
          .then((room_response) => {
            let authenticated_room = new AuthenticatedRoom(room_response.data);
            this.props.changeRoom(authenticated_room);
          });
        alert('Successfully authenticated');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.reloadRooms();
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
                      <br/>
                      <button onClick={(e) => {this.authenticateRoom(room.id);}}>Authenticate</button>
                    </div>
                  </div>
                );
              }
            )
        }
        {this.state.is_creating ?
          <div className="Roomlist__create-item-dialog">
            <label>
              PIN:
              &nbsp;
              <input type="text"
                     value={this.state.new_room_pin}
                     onChange={(e) => {this.setState({new_room_pin: e.target.value});}}
              />
            </label>
            &nbsp;
            <label>
              Description:
              &nbsp;
              <input type="text"
                     value={this.state.new_room_description}
                     onChange={(e) => {this.setState({new_room_description: e.target.value});}}
              />
            </label>
            <br/>
            <button onClick={(e) => {this.createRoom(this.state.new_room_pin, this.state.new_room_description)}}
                    disabled={!this.state.new_room_pin || !this.state.new_room_description}>
              Create
            </button>
            &nbsp;
            <button onClick={(e) => {this.setState({new_room_pin: '', new_room_description: '', is_creating: false});}}>
              Cancel
            </button>
          </div>
          :
          <div className="Roomlist__create-item-btn"
               onClick={(e) => {this.setState({is_creating: true})}}>
            <i className="material-icons">&#xE148;</i>
            &nbsp;
            Get a room
          </div>
        }
      </div>
    );
  }

}