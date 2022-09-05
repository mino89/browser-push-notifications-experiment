# Getting started

## Generate keys 

First, we need to generate a private and public VAPID key. We'll generate those keys with the [web-push npm package](https://www.npmjs.com/package/web-push), we'll use the same package to send push messages from the backend.

```
npx web-push generate-vapid-keys
```

## Setup Environment Variables
Create a `.env` file in your app root 

```
PUBLIC_VAPID="yourPublicKeyHere"
PRIVATE_VAPID="yourPrivateKeyHere"
```

or set Environment variables manually

```
export PUBLIC_VAPID="yourPublicKeyHere"
export PRIVATE_VAPID="yourPrivateKeyHere"
```

replace publicVapidKey variable with your own in /client/index.js
```
const publicVapidKey = "yourPrivateKeyHere"
```

## Run MongoDB

To pull the image and run the container for the first time, run the following commands:

```
docker pull mongo
docker run -d -p 27017-27019:27017-27019 --name mongo mongo:latest
```

After that, you can start the already existing container like this:

```
docker container start mongo
```

You can enter the docker container's bash terminal with the following command. Run `mongo` in there to inspect the database:

```
docker exec -it mongo bash
```

## Run the app

After having a running mongo instance, you can execute the following command to start the web application

```
npm start
```