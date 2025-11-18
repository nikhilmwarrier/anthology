set dotenv-load

# Install dependencies and set up hooks
init:
  git config --local core.hooksPath .githooks/
  pnpm i

# Deploy app to connected Android device
preview:
  scripts/remove_internet_permission.sh
  pnpm run build
  npx cap sync
  npx cap run android

# Start dev server with live reload
run_server:
  pnpm run dev

# Deploy app with live reload
run_app:
  scripts/insert_internet_permission.sh
  npx cap copy
  npx cap run android --live-reload

# Build a debug apk to `./android/app/build/outputs/apk/debug/app-debug.apk`
build_debug:
  scripts/remove_internet_permission.sh
  pnpm run build
  npx cap sync
  cd android && ./gradlew assembleDebug


# Build a release apk. Make sure the correct environment variables are set.
build_release:
  scripts/remove_internet_permission.sh
  pnpm run build
  npx cap sync
  cd android && ./gradlew clean assembleRelease \
            -PRELEASE_STORE_FILE="$RELEASE_STORE_FILE" \
            -PRELEASE_STORE_PASSWORD="$RELEASE_STORE_PASSWORD" \
            -PRELEASE_KEY_ALIAS="$RELEASE_KEY_ALIAS" \
            -PRELEASE_KEY_PASSWORD="$RELEASE_KEY_PASSWORD"

sync:
  npx cap sync 
