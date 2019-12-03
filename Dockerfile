FROM node:latest

RUN mkdir se-symposium-quiz
WORKDIR se-symposium-quiz

COPY . .
RUN npm install

COPY . .

USER node
EXPOSE 4000

CMD ["npm", "run", "start"]