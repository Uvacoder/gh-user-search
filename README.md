# GitHub User Search

###### You can find a live demo **[here](https://user-search-gh.herokuapp.com/)**.

***

## Description

This site implements a portion of GitHub's Search feature, the user search, using their public GraphQL API. On this site, you can search through GitHub users and view a paginated list of results, as well as details about each user result.

## Features

- Paginated results using `GraphQL`
- Emoji translation and display using `Emoji Mart`
- Light/Dark mode theme toggle using `Material-UI` and cookies
- Search button animation using `CSS `transitions
- Page results animation using `Material-UI`
- Built function to format large follower/following counts
- Mobile responsive

## Technologies

This site was built and hosted using:

- React
- TypeScript
- Material-UI
- Axios
- Create React App
- Emoji Mart
- universal-cookie
- GitHub GraphQL API
- Heroku

## Project Specifications

The goal of this exercise is to create an app that implements a portion of GitHub's Search feature, the user search, using their public API. Please share a working deployed version of the exercise as well as the GitHub repo.

The app should NOT require users of the application to provide GitHub permissions.
The purpose of this code exercise is for us to see a little taste of who you are as a developer. Don't worry about 'over-engineering' your solution, and don't be afraid to add additional features (or playful flourishes!), as long as what you build is something you're proud of.

We know that there will be things that you wished you could add if you had more time, that's part of the goal! We learn as much about you from what you choose not to include as we do from what you include!

Feel free to use third party libraries or other code that you did not write to help you implement your exercise. However, please make sure that it is obvious which code you wrote and which code you borrowed from somewhere else. Also, be sure there's enough of your own work to give us an accurate impression of who you are.

##### Setup

Use the latest version of the framework or library.
- You may use any build system you wish, including any CLI.
- You may use any additional third-party libraries you see fit.

##### Minimum Requirements

Use https://github.com/search as a reference for functionality, but feel free to change style, behavior, and features as you see fit and time permitting. It is not necessary to match the actual design of GitHub and we are not expecting a professional design. Focus on functionality and code.

As a user,

- I can search for users and see a paginated list of results
- I can navigate through the next and previous pages of the paginated results
- I see the total count of search results
- I see notable information for each search result, such as the description, star/follower count, profile pictures, etc.
- I can select a search result and be taken to the applicable page on GitHub

The app should utilize GitHub's public API; either the v3 REST API or the v4 GraphQL version. Examples of the API call you'll likely need to make:

- https://developer.github.com/v3/search/
- https://api.github.com/search/users?q=example