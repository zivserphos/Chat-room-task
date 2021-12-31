# Use Node v4 as the base image.
FROM node:16-alpine3.12

# Add everything in the current directory to our image, in the 'server' folder.
ADD ["package.json", "package-lock.json*", "./"] server

RUN npm install

COPY . .

# Expose our server port.
EXPOSE 8123

# Run our app.
CMD ["node", "/server/index.js"]