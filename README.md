# Strawpoll

[![Build status](https://dev.azure.com/mic-max/Strawpoll/_apis/build/status/strawpoll%20-%20CI)](https://dev.azure.com/mic-max/Strawpoll/_build/latest?definitionId=2)
[![Deployment status](https://vsrm.dev.azure.com/mic-max/_apis/public/Release/badge/aaea9094-828a-4491-bb33-f65861658613/2/2)](https://dev.azure.com/mic-max/Strawpoll/_release)

I created a similar project when I was in first year university and wanted to recreate it to see how far I've progressed. The 2015 version was written using PHP 5, MySQL (which I'm sure I setup in a way that was succeptible to SQL injection attacks), terrible coding style (1 letter variable names) and a lot of effort spent setting it up on my custom VPS.

Now that I'm a more seasoned web developer I chose to use Node.js, WebSocket (instead of each user polling the database every 2 seconds to see changes) and MongoDB. These changes should make the app a lot easier to modify and evolve as users have suggestions for features they'd like to see. Also, this will be hosted on Microsoft Azure so deployment is going to be a lot easier to manage and I have also focused on making local development just as easy.

So here's some instructions on getting up and started if you want to run this web app yourself, or for my future self so I don't completely forget how to get started.

## Installation
1. Install Node
2. Install MongoDB
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

## Todo List

This list is probably going to be a mess until I make more progress.

- ~Custom domain name: strawpoll.xyz~
    - Have www.strawpoll.xyz redirect to strawpoll.xyz
- ~Feature: Live updates on the results page~
    - Add a cool graph to the results page, pie chart ??
- ~Feature: Have Poll IDs start from 1~
    - Buttons to navigate to next and prev poll
    - Popular, random, hot, featured polls
- Feature: Allow multiple votes, select box instead of radio
- Feature: Allow adding options after the poll was already created
- Feature: Optionally options can have an associated image, use imgur ??
- Feature: Optionally let poll creator decide colours for options, affects meter bar
- Feature: Set voting time limit or end time
- Feature: Optionally add captchas before letting a user vote
- Feature: Hide results until user has voted ??
- Design: Make sure tabbing works to go to the next element
    - It should create the poll when you press enter
- Test: Test on all major browsers
- Test: Add unit tests
- Test: Improve the logging
- Perf: Run google page speed analysis
- Bug: Fix Pug error @ http://localhost:9001/5d9442b8222a5b1c2883cc37
- Bug: Ensure the public cannot see vote IP addresses from the API
- Code: Clean up comments, files, etc.
- Code: Have some people give this a code/design review
- Feature: Don't let users create poll without a question and 2+ options
- Code: Add presubmit hook to run tests and linting automatically
- Code: Move the polls router from `app.js` to `routes/polls.js`, need access to wss
- Design: Add a copy to clipboard button to results page, _copies voting link_
    - Send poll creator directly to results page ??
- Design: Add a loading icon for Create Poll and Vote buttons
    - Dispaly an error when a request fails
    - Make the button flash red ??
    - Let user know their vote didn't count ??
- Feature: On results page indicate which option(s) the viewer voted for
- Feature: Allow users to save a poll as a draft, as a link with query parameters ??
- Feature: Add version number to the footer
- Design: Order options on the results page by number of votes ??
- Code: Have a better logger
- Code: Make scripts platform independent, Windows + Linux

- Design: Add a cool 404 page
- Code: Add badges to the README https://shields.io/

- Test: Add a staging area for testing features on a live server, dev.strawpoll.xyz ??
- Test: Disable colours when in production, azure log stream doesn't support
- Perf: Use http2 server
- Perf: Have websocket server use the same http server express uses
- Perf: Add minification to js + css (+ rendered html?) when deployed
- Perf: Only send socket messages to clients that have the tab active ??
- Design: Responsive webpage, phone friendly
- Feature: Store info about who created a poll
    - Feature: Allow polls to be made private (only viewable by its creator)
    - Feature: Delete/restore polls
- Monetization: Add ads to make money
- Monetization: Advertise the service to get users
- Perf: Cache recent polls using redis, minimize database transactions
- Feature: Make a simple cli app that can make polls and see results
- Code: Use vue.js ??
    - 1 page app ??
    - No querying the document manually
- Future: Consider what changes would need to happen if a v2 was created
- Perf: Reduce number of dependencies ??
- Code: Socket messaging architecture
    - https://github.com/meteor/meteor/blob/devel/packages/ddp/DDP.md