export class UnauthenticatedRoom {
  constructor(id, description, video_source_uri) {
    this.id = id;
    this.description = description;
    this.video_source_uri = video_source_uri;
  }
}

export class AuthenticatedRoom extends UnauthenticatedRoom {
  constructor(unauthed_room, pin, videotime) {
    super(unauthed_room.id, unauthed_room.description, unauthed_room.video_source_uri);
    this.pin = pin;
    this.videotime = videotime;
  }
}