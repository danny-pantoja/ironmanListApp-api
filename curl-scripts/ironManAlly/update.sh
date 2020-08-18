#!/bin/bash

API="http://localhost:4741"
URL_PATH="/ironManAlly"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
    "ironManAlly": {
      "ally": "'"${ALLY}"'",
      "description": "'"${DESCRIP}"'"
    }
  }'

echo
