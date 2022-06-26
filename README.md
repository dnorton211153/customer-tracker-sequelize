# Customer Tracker

Two pieces:

* (1) client: a static React app which communicates to its server to store and manipulate customer/company records.  Extremely primitive UI just to prove the concept!

* (2) server: Node/Express app with hooks to MySQL backend using Sequelize.

You will need to update *.env* and *config.json* in the /config directory, using config.env_DEFAULT as a guide.


### To seed the database:
```
node seed
```

### To start in dev mode:
```
npm run dev
```
This will use concurrently to start both the server and front-end client.  The React front-end will proxy requests on the default port (3000 or whatever you choose) the the back-end APIs (port 5000 or whatever you choose).

### To start in production mode:

Once you have built the React client in the client directory with 'npm build', you can switch the NODE_ENV from *'development'* to *'production'*, which will cause the server to use the /client/build/index.html for static page delivery (which means you only need to start the server, not the client).  So you can just run:
```
npm run start
```

@author Dave Norton 2022

The client project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the server in the development mode.\
The server runs on [http://localhost:5000](http://localhost:5000) and its default api is /api/customers.

### `npm run server`

Runs the server with nodemon in the development mode, for automatic restarts when editing.\

### `npm run client`

Runs the React client in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

Notice that the client is configured with a proxy to http://localhost:5000, so api calls need not reference the base URL of the server.

### `npm run dev`

Concurrently runs the server and the React client in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
