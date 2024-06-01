# Found analytics

Hey there!

Thanks for taking the time to check this out. This repo serves as a collection of thoughts and ideas regarding implementing things like event tracking and feature flagging into Found.

It’s based on some lessons I learned from my time working at Pathize. Any library could realistically be used for this; we used Posthog, so that’s what is included here.

## Event tracking

A useful insight I gained from working with event tracking is to have some kind of “system” for how to categorize and organize events.

For example, most APIs let you capture structured metatadata for any tracked event and set properties, but the actual event “name,” such as “Loaded” or “Button pressed,” is usually unstructured/left to be a string.

Ideally, these event names shouldn’t change, and should also be easy to work with across dozens of engineers. Even when working on this solo, I ran into issues where the names I initially chose could have benefited from being systematized in some way.

Something that became quite useful is strongly typing the event names. Inside of `analytics.ts` is a helper function called `interactionEvent` that wraps the `posthog` `capture()` method. It’s largely the same, but the event name is broken down into basic noun + verb pairing.

Example usage:

```jsx
interactionEvent("Button", "Pressed")
```

This approach lets you structure event more rigidly to avoid confusion across the team as to how to name events. It has the additional benefit of being extendable based on the element and the action (you can easily add “Scrolled” as an action, in addition to pressed or other actions.

## Feature flagging

Feature flagging likely depends on the analytics suite that you use. With posthog, you define the features inside of the software GUI, and give that feature different properties. Posthog also allows for things like A/B testing.

I found that if a page contains a lot of features, one function that returns all of the features from Posthog did a good job cleaning things up. This can be found inside of `getFeatures.ts`.

Example usage (usage inside of a React component and/or a page):

```jsx
import { getFeatures } from "./featureFlags";

// ...

const features = getFeatures(["EX-35", "FF-12"]);
const paywallFeature = features.find((f) => f.flagKey === "EX-35");

if (paywallFeature?.enabled) {
    // ...do something
}
```

You can simply pass the identifiers for the features into `getFeatures()`, and it returns all of the details associated with that feature, including its variant (if using A/B testing), if it is enabled, and other metadata that is defined inside of Posthog.
