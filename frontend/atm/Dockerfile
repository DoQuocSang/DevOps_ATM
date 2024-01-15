FROM node

# Cài đặt Ionic CLI toàn cục
RUN npm install -g @ionic/cli

WORKDIR /atm

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8100

ENV MONGODB_USERNAME=root
ENV MONGODB_PASSWORD=secret 

ENTRYPOINT ["ionic"]

CMD ["serve", "--external"]
