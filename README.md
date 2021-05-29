# blueocean

<!-- ABOUT THE PROJECT -->

## About The Project

[![Set and Forget Screen Shot]('./client/public/set-and-forget-ss')

This is an app to optimize organization for chefs, restaurant managers, and anyone who enjoys cooking!

Here's why:

- Your time should be focused on creating something amazing. A project that solves a problem and helps others
- You shouldn't be doing the same tasks over and over like creating a README from scratch
- # You should element DRY principles to the rest of your life :smile:
  Functionalities:

* A dynamic calendar lets you add and remove meals and shows you when you need to start preparing each meal
* A shopping list is generated from a given week with all the ingredients you will need to buy
* A database stores your recipes and lets you browse all of the public recipes created by other users of the app

Of course, no one template will serve all projects since your needs may be different. So I'll be adding more in the near future. You may also suggest changes by forking this repo and creating a pull request or opening an issue. Thanks to all the people have have contributed to expanding this template!

This app is a capstone project created for the Hack Reactor Software Engineering Immersive, a 13-week program focused on mastering the full MERN stack.

### Built With

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [Material UI](https://material-ui.com/)
- [Redis](https://redis.io/)

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- Node to access NPM

### Installation

## Make a Mongo Cluster and DB

1. [Create a cluster](https://codeforgeek.com/mongodb-atlas-node-js/) on Mongo Atlas
2. Obtain your Mongo URI link
3. touch .env
4. Paste your Mongo URI into your .env file in this format:
   MONGOURI=your-unique-mongo-uri-for-your-cluster

## Setup authentication with firebase

1. Create firebase account and create a new project
2. In project settings select config and copy your app config
3. Create config.js and paste your firebase config
4. gitignore config.js
5. In firebase under sign-in methods, choose Google Authentication
6. Export config from config.js and import config into files using Auth.

## Install the dependencies and start the application

- Make sure you have [node](https://nodejs.org/en/) installed
- Run 'npm install' to install the dependencies
- Run 'npm start' in one terminal and 'npm run build' in another terminal

<!-- USAGE EXAMPLES -->

## Usage

![Demo of website](https://media.giphy.com/media/fnkc4ssvyIpI6FleTU/giphy.gif)

# API Documentation

API Routes and Mongo Schema setup
https://docs.google.com/document/d/15YZd_PZaXBtqnHqv1-0PO6uAbcINl_q_OgL6_PhdU3s/edit

<!-- ROADMAP -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Project Link: [https://github.com/Team-Rocky/blueocean](https://github.com/Team-Rocky/blueocean)
