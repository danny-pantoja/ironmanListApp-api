#!/bin/bash

API="http://localhost:4741"
URL_PATH="/ironManAlly"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "ironManAlly": {
      "ally": "'"${ALLY}"'",
      "description": "'"${DESCRIP}"'"
    }
  }'

echo
