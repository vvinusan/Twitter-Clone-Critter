# Twitter-Clone-Critter

Critter- a functional Twitter clone that features cool cats and their musings

---

## Initial setup

> **NOTE: You will need 2 terminals for this project to run!** (A split terminal works just as well)

### **First Terminal: The Server**

A `server` folder is provided with the backend code. This is a local server that you will connect to to retrieve/write the data.

#### Install the backend dependencies:

1. Open a terminal.
2. Navigate to the server folder: `cd server`.
3. Install the required packages: `yarn install`
4. Once that's done you can start the server: `yarn start:server`

### **Second Terminal: The Website**

1. Open a terminal.
2. Navigate to the server folder: `cd client`.
3. Install the required packages: `yarn install`
4. Once that's done you can start using: `yarn start`

---

## Twitter crash course

If you're not familiar with Twitter, this section helps describe the app we're building a clone of.

Twitter is a social network/"micro-blogging" platform. You must be registered to post, but tweets are public and can be seen by non-registered users. Every twitter user chooses a username, often called a "handle". Conventionally, the handle is prefixed with an "@" symbol (eg. `@misswhatever`).

A "tweet" is a post, limited to 280 characters. Tweets can include media like photos or videos. Our clone will have limited media support.

Every profile as a "feed". A feed is a series of tweets. A user's profile feed shows all of the tweets they've posted, plus all of the tweets they've shared.
