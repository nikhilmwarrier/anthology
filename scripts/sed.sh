#!/usr/bin/env bash

# Wrapper to force GNU sed.
# Sinetris on StackOverflow - Retrieved 2025-12-28, License - CC BY-SA 4.0

set -Eeuo pipefail

if [[ "$OSTYPE" == "darwin"* ]]; then
  # Require gnu-sed.
  if ! [ -x "$(command -v gsed)" ]; then
    echo "Error: 'gsed' is not istalled." >&2
    echo "If you are using Homebrew, install with 'brew install gnu-sed'." >&2
    exit 1
  fi
  SED_CMD=gsed
else
  SED_CMD=sed
fi

${SED_CMD} "$@"
