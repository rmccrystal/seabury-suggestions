FROM node

WORKDIR /usr/src/app/backend
COPY backend/package*.json .
RUN npm install

WORKDIR /usr/src/app/frontend
COPY frontend/package*.json .
RUN npm install

COPY backend/* .
RUN npm run build

WORKDIR /usr/src/app/backend
COPY frontend/* .
RUN npm run build

EXPOSE 3000

CMD npm run start