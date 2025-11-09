preview:
  npx cap run android

dev:
  pnpm run dev

run:
  npx cap run android --live-reload

build:
  pnpm run build
  npx cap sync
  npx cap run android

sync:
  npx cap sync
