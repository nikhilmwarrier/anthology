import { StatusBar } from "@capacitor/status-bar";
import { NavigationBar } from "@squareetlabs/capacitor-navigation-bar";

export async function showSystemBars() {
  return Promise.all([StatusBar.show(), NavigationBar.show()]);
}

export async function hideSystemBars() {
  return Promise.all([StatusBar.hide(), NavigationBar.hide()]);
}
