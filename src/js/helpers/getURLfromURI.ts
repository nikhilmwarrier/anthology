import { Capacitor } from "@capacitor/core";
import { PLATFORM } from "../constants";

export default function getURLfromURI(uri: string) {
  if (PLATFORM === "web") return uri;
  return Capacitor.convertFileSrc(uri);
}
