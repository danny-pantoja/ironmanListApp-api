#!/bin/bash

API="http://localhost:4741"
URL_PATH="/ironManSuit"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "ironSuit": {
      "MODEL": "'"${MODEL}"'",
      "description": "'"${DESCRIP}"'"
    }
  }'

echo
