#!/bin/sh

set -eux
set -o pipefail

# Add the internet permission to Line 3
sed -i '3i     <uses-permission android:name="android\.permission\.INTERNET" \/>' ./android/app/src/main/AndroidManifest.xml
