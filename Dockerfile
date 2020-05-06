FROM node

WORKDIR /usr/src/app

# Install backend deps
COPY package.json .
COPY yarn.lock .
RUN yarn

# Install frontend deps
WORKDIR /usr/src/app/frontend
COPY frontend/pacakge.json ./
COPY frontend/yarn.lock ./

WORKDIR /usr/src/app
COPY . .
RUN yarn build

EXPOSE 3000

RUN npm run start
