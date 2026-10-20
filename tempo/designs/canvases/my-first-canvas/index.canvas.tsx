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
    </Canvas>
  );
}
