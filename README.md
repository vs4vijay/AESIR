# Realtime Sync

Deployed Version: https://realtime-sync.herokuapp.com/

## Functionalities

- User can use 3 sliders to rotate the Cube on X, Y or Z Axis
- Clicking on Button and Anywhere on the canvas changes the color of Cube randomly
- Any other clients connected at the same time will receive all the events and changes will be reflected instantly

---

## Tech. Stack

- NodeJS + Express for APIs and Serving Static Files
- Socket.io for Real Time Communication
- Processing (p5.js) for Drawing UI
- Docker for Containerization

---

## Limitations
- Currently, only default namespace is used, but We can make use of socket.io's rooms option to make multiple rooms
- Since Socket.io can use WebSockets or Long Polling (If client doesn't support WebSockets), then Auto Scaling won't be possible by default. We might need to use Sticky Session on Load Balancer to Work properly

---

## Future Enhancements
- Can have multiple rooms/channels functionalities
- Cube drawing can be enhanced
- framerate is currently set as 30 FPS, this can be configured from "FRAME_RATE" config variable in "public/client-app.js"
- Frontend App codebase ("/public" folder) can be made modular
- Currently using Structured Logging (from pino logger), but We can have an Event Store (Part of Event Sourcing Implementation) on Server side which will track all the events published
- Can use Redis Adapter to Scale out application on multiple nodes

---

## Other Alternatives
- WebRTC
- Pusher
- Deepstream.io
- Firebase

---

### Development Notes

```shell

```
