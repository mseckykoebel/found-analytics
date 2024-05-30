import { posthog } from "posthog-js";

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

// define screen names (improvement: generate automatically from the router)
type ScreenNames = "Home" | "Profile";

type InteractionEventProps = {
  value?: string | number | boolean; // value of the element interacted with
  $screen_name: ScreenNames;
  $set?: Record<string, string | unknown>;
};

// call this function when an element is interacted with
export function interactionEvent(
  event: InterfaceElement,
  operation: InterfaceOperation,
  props: InteractionEventProps
) {
  posthog.capture(`${operation} ${event}`, props);
}
