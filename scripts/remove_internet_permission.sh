#!/bin/sh

set -eux
set -o pipefail

# Delete the internet permission 
sed -i '/.*android\.permission\.INTERNET/d' ./android/app/src/main/AndroidManifest.xml
