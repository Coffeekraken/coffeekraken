#!/usr/bin/env bash

# Getting current working directory
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# Installing thr sugar CLI globally
echo "Installing sugard CLI globally"
ln -s $SCRIPT_DIR/packages/core/cli/src/cli/sugar.cli.js /usr/local/bin/sugard