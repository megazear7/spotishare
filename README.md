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
> Note that I am trying to get a solution that doesn't require the build directory to be commited to the repo / doesn't require the `npm run build` step.

```Bash
npm run build
git add .
git commit -m "updated prod build"
git push heroku master
```

To run in production:
- node app.js
- This automatically happens when pushing to heroku.

## Develop

Backend Server is created with [Express](https://expressjs.com/).
Front end JS / user interface is created with [Create React App](https://github.com/facebookincubator/create-react-app).
CSS / Visuals is implemented with [React Semantic-UI](https://react.semantic-ui.com).
