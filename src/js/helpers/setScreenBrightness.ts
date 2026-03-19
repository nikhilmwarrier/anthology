import { ScreenBrightness } from "@capacitor-community/screen-brightness";
import { PLATFORM } from "../../js/constants";

/**
 * Set brightness. Value of -1 sets it to default.
 * @param value
 */
export default async function setScreenBrightness(value: number) {
  if (PLATFORM === "web") return;

  ScreenBrightness.setBrightness({
    brightness: value,
  }).catch(console.error);
}
