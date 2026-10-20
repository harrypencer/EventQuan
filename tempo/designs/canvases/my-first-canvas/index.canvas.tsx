import { Canvas, RouteStoryboard } from "tempo-sdk/canvas";

export default function GenerationCanvas() {
  return (
    <Canvas name="My first canvas">
      <RouteStoryboard
        id="welcome"
        name="1 · Sign in"
        route="/welcome"
        layout={{ x: 0, y: 0, width: 390, height: 844 }}
      />
      <RouteStoryboard
        id="welcome-campus"
        name="2 · Campus identified (skin on)"
        route="/welcome?step=campus"
        layout={{ x: 470, y: 0, width: 390, height: 844 }}
      />
      <RouteStoryboard
        id="home"
        name="3 · University Home"
        route="/"
        layout={{ x: 940, y: 0, width: 390, height: 844 }}
      />
      <RouteStoryboard
        id="events"
        name="4 · EventFinder"
        route="/events"
        layout={{ x: 1410, y: 0, width: 390, height: 844 }}
      />
      <RouteStoryboard
        id="node"
        name="5 · Kyle Field node"
        route="/node/kyle-field"
        layout={{ x: 1880, y: 0, width: 390, height: 844 }}
      />
      <RouteStoryboard
        id="gameday"
        name="6 · Gameday (Game Mode)"
        route="/gameday"
        layout={{ x: 2350, y: 0, width: 390, height: 844 }}
      />
      <RouteStoryboard
        id="quick-event"
        name="7 · Quick Event"
        route="/quick-event"
        layout={{ x: 2820, y: 0, width: 390, height: 844 }}
      />
      <RouteStoryboard
        id="quick-event-posted"
        name="7b · Quick Event posted"
        route="/quick-event?state=posted"
        layout={{ x: 3290, y: 0, width: 390, height: 844 }}
      />
      <RouteStoryboard
        id="map"
        name="Map tab"
        route="/map"
        layout={{ x: 940, y: 984, width: 390, height: 844 }}
      />
      <RouteStoryboard
        id="messages"
        name="Messages tab"
        route="/messages"
        layout={{ x: 1410, y: 984, width: 390, height: 844 }}
      />
      <RouteStoryboard
        id="profile"
        name="Profile tab"
        route="/profile"
        layout={{ x: 1880, y: 984, width: 390, height: 844 }}
      />
      <RouteStoryboard
        id="v2-welcome"
        name="v2 · Welcome"
        route="/v2/welcome"
        layout={{ x: 40, y: 2481, width: 390, height: 844 }}
      />
      <RouteStoryboard
        id="v2-home"
        name="v2 · Home"
        route="/v2"
        layout={{ x: 510, y: 2481, width: 390, height: 844 }}
      />
      <RouteStoryboard
        id="v2-discover"
        name="v2 · Discover"
        route="/v2/discover"
        layout={{ x: 980, y: 2481, width: 390, height: 844 }}
      />
      <RouteStoryboard
        id="v2-event"
        name="v2 · Event"
        route="/v2/event"
        layout={{ x: 1450, y: 2481, width: 390, height: 844 }}
      />
      <RouteStoryboard
        id="v2-ticket"
        name="v2 · Gameday pass"
        route="/v2/ticket"
        layout={{ x: 1920, y: 2481, width: 390, height: 844 }}
      />
      <RouteStoryboard
        id="v2-profile"
        name="v2 · Profile"
        route="/v2/profile"
        layout={{ x: 2390, y: 2481, width: 390, height: 844 }}
      />
      <RouteStoryboard
        id="v2-campus"
        name="v2 · Campus identified"
        route="/v2/campus"
        layout={{ x: 40, y: 3465, width: 390, height: 844 }}
      />
      <RouteStoryboard
        id="v2-map"
        name="v2 · Map"
        route="/v2/map"
        layout={{ x: 510, y: 3465, width: 390, height: 844 }}
      />
      <RouteStoryboard
        id="v2-messages"
        name="v2 · Messages"
        route="/v2/messages"
        layout={{ x: 980, y: 3465, width: 390, height: 844 }}
      />
      <RouteStoryboard
        id="v2-chat"
        name="v2 · Group chat"
        route="/v2/chat"
        layout={{ x: 1450, y: 3465, width: 390, height: 844 }}
      />
      <RouteStoryboard
        id="v2-create"
        name="v2 · New event"
        route="/v2/create"
        layout={{ x: 1920, y: 3465, width: 390, height: 844 }}
      />
      <RouteStoryboard
        id="v2-posted"
        name="v2 · It’s live"
        route="/v2/posted"
        layout={{ x: 2390, y: 3465, width: 390, height: 844 }}
      />
    </Canvas>
  );
}
