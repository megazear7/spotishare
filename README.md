# Spotishare

# Installation

```
git clone https://github.com/megazear7/spotishare.git
cd spotishare
npm install
npm run dev
```

# Running

To run in development:
- npm run dev

To deploy to production:
- npm run build
- git add .
- git commit -m "updated prod build"
- git push heroku master

To run in production:
- node app.js
= This automatically happens when pushing to heroku.

# Developing

Backend Server is created with [Express](https://expressjs.com/).
Front end JS / user interface is created with [Create React App](https://github.com/facebookincubator/create-react-app).
CSS / Visuals is implemented with [React Semantic-UI](https://react.semantic-ui.com).
