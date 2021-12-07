#!/bin/sh

set -eux

BASE_DIR="$(cd "$(dirname "$0")"; pwd)";
BUILD_DIR="$BASE_DIR/dist"
PUBLIC_DIR="$BASE_DIR/public"

for file in `find $BUILD_DIR -name "*.js"`; do
  gzip -k -9 -f $file
done
for file in `find $BUILD_DIR -name "*.css"`; do
  gzip -k -9 -f $file
done
