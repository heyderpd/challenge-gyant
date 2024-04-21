# gyant test

## requiriments of the project

* nvm
* npm
* docker
* docker-compose

### running dependencies

to run a local mongodb and stripe need to run docker.

```shell
docker-compose up
```

### install app

```shell
npm i
```

### run app

```shell
npm run start
```

### Using local api

Can use the file `Gyant.postman_collection.json` to help on call the endpoints.

### System Design

Can see the diagram on file `gyant.drawio.pdf`

### notes

* The flow of use case 01 in the app is complete
* I tried complete the flow of use case 02 in the app. but unfortunately is lack the real confirmation part of stripe.
