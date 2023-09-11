#!/bin/sh

echo "Generate Prisma"
yarn prisma generate

if [ $? -eq 0 ]; then
  echo "Prisma generation successful. Starting development server..."
  yarn start:dev
else
  echo "Prisma generation failed. Development server not started."
fi

exit 0
