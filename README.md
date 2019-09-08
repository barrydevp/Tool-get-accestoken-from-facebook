# TOOL GET TOKEN FACEBOOK USING NODEJS/PUPPETEER
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFEvvdj6hTYZrVCnSfzCzH2fCp9IKqV7EEZzeGqgFAdVseGCblkA" width="86px" height="86px" alt="RxJS Logo"> TOOL GET TOKEN FACEBOOK
======================================


![CircleCI](https://circleci.com/gh/ReactiveX/rxjs/tree/master.svg?style=svg)
![Join the chat at https://gitter.im/Reactive-Extensions/RxJS](https://badges.gitter.im/Join%20Chat.svg)

# TOOL GET TOKEN FACEBOOK 1.3 (alpha)

TOOL GET TOKEN FACEBOOK using NodeJs/ExpressJs/Puppeteer

## Important

By contributing or commenting on issues in this repository, whether you've read them or not, you're agreeing to the Contributor Code of Conduct. Much like traffic laws, ignorance doesn't grant you immunity.

## Installation and Usage

### via npm

```sh
npm install
```

### via yarn

```sh
yarn
```

### Usage after run
 - Goto localhost:2901/startGetToken (start tool default interval 40 seconds)
 - Goto localhost:2901/startGetToken/:miliseconds (start tool with miliseconds)
  - Goto localhost:2901/stopGetToken (stop tool)

# Config required

### Find .env File in the root folder

```.env
....

# API SocialAccount
URL_GET_INFOR='{your url API to get information off account facebook}'

# REDIS
REDIS_PORT={your redis port}
REDIS_HOST='{your redis host}'

....
```

## Building/Testing

- `yarn build` - builds everything
- `yarn start` - runs your production
- `yarn dev` - run test


