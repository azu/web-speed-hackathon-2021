#!/bin/sh

set -eux

BASE_DIR="$(cd "$(dirname "$0")"; pwd)";
BUILD_DIR="$BASE_DIR/dist"
PUBLIC_DIR="$BASE_DIR/public"

for file in `find $BUILD_DIR -name "*.js" -name "*.css"`; do
  gzip -k -9 $file
done
