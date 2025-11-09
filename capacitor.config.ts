import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "systems.nik.anthology",
  appName: "Anthology",
  webDir: "dist",
  server: {
    cleartext: true,
  },
};

export default config;
