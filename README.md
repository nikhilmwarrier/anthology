<p align="center"><img src="./assets/logo.svg" width="150"></p>
<h1 align="center"><b>Anthology</b></h1>
<h4 align="center">Sleek, fast ebook reader for Android</h4>

<p align="center">
<a href="https://github.com/nikhilmwarrier/anthology/releases">
<img align="center" src="https://raw.githubusercontent.com/rubenpgrady/get-it-on-github/refs/heads/main/get-it-on-github.png" alt="Get it on GitHub" height="96" />
</a>
</p>

## Screenshots

<p align="center">
<img width="250px" src="./fastlane/metadata/en-US/images/phoneScreenshots/1.png" alt="Anthology app: Home screen" />
<img width="250px" src="./fastlane/metadata/en-US/images/phoneScreenshots/2.png" alt="Reader screen" />
<img width="250px" src="./fastlane/metadata/en-US/images/phoneScreenshots/3.png" alt="Settings" />
</p>

## Powered by

- [foliate-js](https://github.com/johnfactotum/foliate-js)
- [Svelte](https://svelte.dev)
- [Capacitor.js](https://capacitorjs.com/)
- [Framework7](https://framework7.io)

## Build

### 0. Prerequisites

- Node.js
- Android SDK
- [pnpm](https://pnpm.io)
- [just](https://github.com/casey/just)

Set the environment variable:

```env
ANDROID_SDK_ROOT="path/to/Android/Sdk/"
```

### 1. Clone the repo:

```bash
$ git clone https://github.com/nikhilmwarrier/anthology && cd anthology
```

### 2. Initialise Repo

```bash
$ just init
```

This installs the dependencies using [pnpm](https://pnpm.io).

It also configures the hooks in the `.githooks/` directory, which may help
catch mistakes before you commit them.

### 3. Build debug apk

```bash
$ just build_debug
```

The APK will be generated to `./android/app/build/outputs/apk/debug/app-debug.apk`.

### Addendum: Build Release apk

Set the following environment variables (or put them in a `.env` file).

```env
RELEASE_STORE_FILE="my_keystore.jks" # Relative to ./android/app/
RELEASE_STORE_PASSWORD="my_keystore_password"
RELEASE_KEY_ALIAS="my_key_alias"
RELEASE_KEY_PASSWORD="my_key_password"
```

And then run:

```bash
$ just build_release
```

The signed APK will be generated to `./android/app/build/outputs/apk/release/app-release.apk`.
