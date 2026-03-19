import { StatusBar } from "@capacitor/status-bar";
import { NavigationBar } from "@squareetlabs/capacitor-navigation-bar";
import { PLATFORM } from "../constants";

export async function showSystemBars() {
  if (PLATFORM === "web") return;
  return Promise.all([StatusBar.show(), NavigationBar.show()]);
}

export async function hideSystemBars() {
  if (PLATFORM === "web") return;
  return Promise.all([StatusBar.hide(), NavigationBar.hide()]);
}
