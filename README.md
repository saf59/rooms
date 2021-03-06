## Prerequisites
   Outlook 2016 or later on Windows (connected to an Office 365 account) or Outlook on the web.
   The application must work on https, and therefore must be hosted for example on [Google cloud] (https://console.cloud.google.com)
## Project setup
```
git clone https://github.com/saf59/rooms 
cd rooms
npm install
npm install -g @vue/cli
npm install -g @vue/cli-service-global
npm install axios --save
npm install vue-popperjs --save
``` 
### the rest are only for tooltip styles (~ 2.4M) and should be removed later
``` 
npm install vue bootstrap-vue bootstrap --save 
npm install jquery --save
npm install sass --save
npm install fibers --save
npm install sass-loader --save
npm install node-sass --save

npm i --save-dev glob-all purgecss-whitelister
npm i --save-dev glob-all purgecss-webpack-plugin
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
### Deploy the application
```
gcloud app deploy  --stop-previous-version
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
#### In vue.config.js edit if nescessary:
```
const find = 'localhost:3000';
const replacement = 'rooms-258209.appspot.com';
```
#### Change if nescessary
```
public\goodRooms.json 
src\manifest.xml
```

## Actions on Google cloud: 

### After each update in console:
```
git pull
npm run build
gcloud app deploy --stop-previous-version
```                   
#### or if you wont to overwrite all:
```
git reset --hard HEAD
gcloud config set project rooms-258209
git pull
npm run build
gcloud app deploy --stop-previous-version
```
