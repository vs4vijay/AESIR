FROM node:24.13.0-alpine

WORKDIR /app

# Copy package files
COPY package.json ./

# Configure npm for potential SSL issues in CI
RUN npm config set strict-ssl false && \
    npm config set registry http://registry.npmjs.org/

# Install production dependencies
RUN npm install --only=production --no-optional

COPY . ./

ENV APP_PORT=9000

EXPOSE ${APP_PORT}

CMD ["node", "src/app.js"]
