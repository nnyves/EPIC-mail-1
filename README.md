
   [![Build Status](https://travis-ci.org/Ramadhan0/EPIC-mail.svg?branch=develop)](https://travis-ci.org/Ramadhan0/EPIC-mail)       [![Coverage Status](https://coveralls.io/repos/github/Ramadhan0/EPIC-mail/badge.svg?branch=develop)](https://coveralls.io/github/Ramadhan0/EPIC-mail?branch=develop)      [![Maintainability](https://api.codeclimate.com/v1/badges/efe251283a6174aec29c/maintainability)](https://codeclimate.com/github/Ramadhan0/EPIC-mail/maintainability)

# EPIC-mail
###### EPIC-Mail this is a web app that help peole exchange messages or information
------------------------------------------------------------------------------

## UI

* HTML
* CSS

### GitHub Pages link for UI
[EPIC-Mail/UI link](https://ramadhan0.github.io/EPIC-mail/ui/index.html) Hosted
[EPIC-Mail/UI link](https://github.com/Ramadhan0/EPIC-mail/tree/gh-pages) Code


## SERVER

## API ENDPOINTS

|  URL |USE |
| ------- |-------|
| POST:   /api/v1/users|  Get the user to Signup |
| POST:   /api/v1/login | Get the user to Login |
| GET:    /api/v1/users |  Get all Users |
| GET:    /api/v1/user/:id | Get a specific User |

| POST:   /api/v1/email|  Compose an Emails |
| GET:    /api/v1/emails|  Get all Emails |
| GET:    /api/v1/email/:id |  Get a specific Email |
| PUT:    /api/v1/email/:id | Update Email |
| GET:    /api/v1/email/sent | Get sent Emails |
| DELETE: /api/v1/email/:id |  Delete  Email |


## Used Tools

### Language
```
*Javascript*
```
### Server Environment
```
 *NodeJS* (run time Environment for running JS codes)
 ```
### Framework
```
 *Express* (used for building fast APIs)
 ```
### Testing Framework and assertion library
```
 *Mocha* and *Chai*
 ```
### Continuous Integration
```
Travis CI
```
### Test Coverage
```
nyc
```
### Git badge
```
coveralls
```
### Deployment
```
Heroku
```
### Heroku link Example

[EPIC Email link](https://epic-mail-2.herokuapp.com)

## Getting Started
These instructions will get you a copy of the project and running it on your local machine for development and testing purposes. 
See deployment for notes on how to deploy the project on a live system.

## Prerequisites
### installation
First clone the repository 
         or 
download the zip file
once this is set up you are going to need this packages. [NodeJS]

```
 [Node Package Installer - NPM] this usually comes with Node or YARN in case NPM doesn't work.
```

## Installing
After cloning this repository to your local machine, 
CD into the package folder using your terminal and run 
```
> npm install / sudo npm install
```



The code above should install the node_modules needed to  run the project on your local machine.

## Run the server
```
> npm start / sudo npm start
```
## Run the test
```
> npm test / sudo npm test
```


