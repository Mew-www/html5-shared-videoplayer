export class UnauthenticatedRoom {
  constructor(unauthed_room_json) {
    this.id               = unauthed_room_json.id;
    this.description      = unauthed_room_json.description;
    this.video            = unauthed_room_json.video;
  }
}

export class AuthenticatedRoom extends UnauthenticatedRoom {
  constructor(authed_room_json) {
    super(authed_room_json);
    // Additional attributes exist when authenticated
    this.pin        = authed_room_json.pin;
    this.playing    = authed_room_json.playing;
    this.videotime  = authed_room_json.videotime;
  }
}