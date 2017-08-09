# Spotishare

## Install

```
git clone https://github.com/megazear7/spotishare.git
cd spotishare
npm install
npm run dev
```

## Run

### Development:
```Bash
npm run dev
```

### Production:
> Note that I am trying to get a solution that only requires the `git push heroku master` step.

```Bash
npm run build
git add .
git commit -m "updated prod build"
git push heroku master
```

To run in production:

> This automatically happens when pushing to heroku.

```Bash
node app.js
```

## Develop

1. Backend server is created with [Express](https://expressjs.com/).
2. Front end JS / user interface is created with [Create React App](https://github.com/facebookincubator/create-react-app).
3. Markup / CSS uses [React Semantic-UI](https://react.semantic-ui.com).
