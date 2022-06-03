FROM mongo

RUN apt-get update
RUN apt-get install -y curl nodejs npm

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start"]