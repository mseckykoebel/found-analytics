import { JsonType, posthog } from "posthog-js";

// custom feature type
type Feature = {
  flagKey: string; // flag ID inside of posthog
  enabled?: boolean;
  payload?: JsonType;
  // add more fields as needed
};

export function getFeatures(flagKey: string[]): Feature[] {
  return flagKey.map((key) => {
    const isEnabled = posthog.isFeatureEnabled(key);
    const payload = posthog.getFeatureFlagPayload(key);

    return {
      flagKey: key,
      enabled: isEnabled,
      payload,
    };
  });
}
