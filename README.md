## Project setup
```
git clone https://github.com/saf59/rooms 
cd rooms
npm install
npm install -g @vue/cli
npm install -g @vue/cli-service-global
npm install axios --save
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

#Actions on https://console.cloud.google.com 
```
gcloud init

git clone https://github.com/saf59/rooms 
cd rooms
npm install
npm install -g @vue/cli
npm install -g @vue/cli-service-global
npm install axios --save
```
##In vue.config.js edit if nescessary:
```
const find = 'localhost:3000';
const replacement = 'rooms-258209.appspot.com';
```
##Change if nescessary
```
public\goodRooms.json 
src\manifest.xml
```
##After each update in console:
```
git pull
npm run build
gcloud app deploy
```
