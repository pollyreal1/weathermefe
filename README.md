# Weather me app Front end

This will work independently without the API but the searches module won't work; because that module needs the backend API.

The UI for this app is mostly composed of map(Map box) with search and weather information upon search; It is inteded to be like that because travelers need to search to look in a map to know their location and the location of which will they travel to. And this is also to help travelers discover new places to go to on the searched location besides on the one which they searched to.

For the search part it is only intended to log all the searches made with the app. I might update this project in the future to make this app more UI/UX friendly. This will be done on my spare time.

For your backend to work please update the **.env** file with the link of your API(8000 is the default run port for laravel serve)
```
VUE_APP_API=http://127.0.0.1:8000
```

## Project setup

```
npm install
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
