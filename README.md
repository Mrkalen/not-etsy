# not-etsy aka happy-hour-homemade

A full stack e-commerce website.

## Live Demo 

[happyhourhomemade](https://happyhourhomemade.herokuapp.com/)

## Technologies used

  - HTML5
  - CSS3
  - JavaScript
  - React.js
  - Node.js
  - Express
  - PostgreSQL
  - Bootstrap 4.5
  - Webpack 4
  - JSONWebtoken

## Features: 

  - User can view items by new
  - User can view details of an item
  - User can add items to their cart
  - User can view their cart
  - User can remove items from their cart
  - User can update quantity in cart
  
## Images

![alt text](https://user-images.githubusercontent.com/70028619/104510807-981b8200-55a0-11eb-981c-8d605a65b3fa.gif)
  
# Development

## System Requirements
  - Bootstrap 4.5 or higher
  - Express 4 or higher
  - NPM 6 or higher
  - Node.js
  - JSONWebtoken
  - Postgres
  - React.js
 
 ## Getting Started
 
 1. Clone the repository
    ```
    git clone https://github.com/Mrkalen/not-etsy
    ```
 2. Make a copy of .env.example
    ```
    cp .env.example .env
    ```
 3. Install all dependencies with NPM
    ```
    npm install
    ```
 4. Confirm postgresql is running
    ```
    sudo service postgresql start
    ```
 5. Create DataBase
    ```
    createdb not-etsy
    ```
 6. Import database Schema and Data
    ```
    npm run db:import
    ```
 7. Start Express API server and Webpack Dev Server
    ```
    npm run dev
    ```
