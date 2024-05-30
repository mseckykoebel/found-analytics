import { posthog } from "posthog-js";

import { ProfileScreenProps } from "./screens";
import { HomeScreenProps } from "./screens";

// define the possible event types
type InterfaceElement =
  | "Button"
  | "Input"
  | "Modal"
  | "Toggle"
  | "Card"
  | "List";
type InterfaceOperation =
  | "Opened"
  | "Closed"
  | "Pressed"
  | "Toggled"
  | "Swiped";

// optional - can be used to track CRUD operations
type CRUDOperation = "Created" | "Updated" | "Deleted";

type ScreenNames = "Home" | "Profile";

type InteractionEventProps = {
  value?: string | number | boolean; // value of the element interacted with
  $screen_name: ScreenNames;
  $set?: Record<string, string | unknown>;
};

export function interactionEvent(
  event: InterfaceElement,
  operation: InterfaceOperation,
  props: InteractionEventProps
) {
  posthog.capture(`${operation} ${event}`, props);
}
