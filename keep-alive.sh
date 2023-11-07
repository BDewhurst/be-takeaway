#!/bin/bash

endpoint="https://be-takeaway.onrender.com/api/restaurants"
while true; do
  echo "Hitting endpoint: $endpoint"
  curl -s -o /dev/null $endpoint

  echo "Sleeping for 14 minutes (900 seconds) before making the next request"
  sleep 840
done