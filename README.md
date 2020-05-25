# Strawpoll

[![Build status](https://dev.azure.com/mic-max/Strawpoll/_apis/build/status/strawpoll%20-%20CI)](https://dev.azure.com/mic-max/Strawpoll/_build/latest?definitionId=2)
[![Deployment status](https://vsrm.dev.azure.com/mic-max/_apis/public/Release/badge/aaea9094-828a-4491-bb33-f65861658613/2/2)](https://dev.azure.com/mic-max/Strawpoll/_release)

I created a similar project when I was in first year university and wanted to recreate it to see how far I've progressed. The 2015 version was written using PHP 5, MySQL (which I'm sure I setup in a way that was succeptible to SQL injection attacks), terrible coding style (1 letter variable names) and a lot of effort spent setting it up on my custom VPS.

Now that I'm a more seasoned web developer I chose to use Node.js, WebSocket (instead of each user polling the database every 2 seconds to see changes) and MongoDB. These changes should make the app a lot easier to modify and evolve as users have suggestions for features they'd like to see. Also, this will be hosted on Microsoft Azure so deployment is going to be a lot easier to manage and I have also focused on making local development just as easy.

So here's some instructions on getting up and started if you want to run this web app yourself, or for my future self so I don't completely forget how to get started.

## Installation
1. Install [Node](https://nodejs.org/en/download/current/)
2. Install [MongoDB](https://www.mongodb.com/download-center/community)
3. Install dependencies: `npm install`

## Development
1. Make a new branch with your changes
2. Add needed tests to `/test`
3. Make sure the tests pass: `npm test`
4. Make sure the linter does not complain: `npm run lint`
5. Open a pull request against the `dev` branch

## Running
### Production
0. The Azure App Service startup command should be: `npm start`
1. Then press the `Deploy to Web App...` button on the App Service pane of the Azure extension for VS Code.
2. Setup CI / CD using Azure Pipelines to automatically build and deploy the app when the `master` branch is updated.
3. Add the connection string named MONGO to the App Service's Configuration.

### Development
0. Ensure the MongoDB service is running
1. Run `npm run dev`
