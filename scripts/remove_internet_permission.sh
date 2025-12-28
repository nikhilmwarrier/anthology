#!/bin/sh

set -eux
set -o pipefail

# Delete the internet permission 
./scripts/sed.sh -i '/.*android\.permission\.INTERNET/d' ./android/app/src/main/AndroidManifest.xml
