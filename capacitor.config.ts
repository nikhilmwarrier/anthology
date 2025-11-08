import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "systems.nik.ember",
  appName: "Ember",
  webDir: "dist",
  server: {
    cleartext: true,
  },
};

export default config;
