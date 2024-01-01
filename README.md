#

# E-comme Backend

![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2012.0.0-brightgreen)
![npm Version](https://img.shields.io/badge/npm-%3E%3D%206.0.0-blue)

## Overview

Welcome to E-comm Backend, this is a Node.js application designed to provide robust functionality for managing categories and products in an e-commerce website. This application allows users to perform CRUD (Create, Read, Update, Delete) operations for categories and products, providing organization and management capabilities for e-commerce businesses.

## Objective

The primary goal of this project is to simplify the management of categories and products for e-commerce websites. It offers a comprehensive set of API endpoints that enable users to efficiently add, retrieve, update, and delete categories and products, enhancing the overall organization and functionality of the e-commerce platform.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Built With](#built-with)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the GitHub repository.
2. Navigate to the application directory in your terminal.
3. Ensure Node.js and npm are installed.
4. Run `npm install` to install all dependencies.
5. Configure your database settings in the appropriate configuration file.
6. Start the application using `node app.js` or a similar command.

## Usage

Once the application is up and running, you can interact with it through API requests. You can use tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to send HTTP requests to the API endpoints.

The available API endpoints include:

- `GET /api/categories`: Retrieve a list of categories.
- `GET /api/categories/:id`: Retrieve a specific category by ID.
- `POST /api/categories`: Create a new category.
- `PUT /api/categories/:id`: Update an existing category by ID.
- `DELETE /api/categories/:id`: Delete a category by ID.

- `GET /api/products`: Retrieve a list of products.
- `GET /api/products/:id`: Retrieve a specific product by ID.
- `POST /api/products`: Create a new product.
- `PUT /api/products/:id`: Update an existing product by ID.
- `DELETE /api/products/:id`: Delete a product by ID.

Make sure to provide the required data in your requests, including category names, product details, and any other necessary information.

Example images of the product working in insomnia

<p align="center">
<img src="./public/images/GetRoutesAll.gif" width="auto" height="500">
</p>

## Features

- **Category Management**: Create, read, update, and delete categories.
- **Product Management**: Create, read, update, and delete products, associating them with categories.
- **API-Based**: Provides a RESTful API for seamless integration with front-end applications.
- **Database Integration**: Utilizes a database to store and manage category and product data efficiently.

## Built With

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [MySQL](https://www.mysql.com/) (or your chosen database)

## Contributing

Contributions to improve the project are welcome. To contribute, please follow these steps:

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

## License

This project is licensed under the ISC License.

https://sequelize.org/docs/v6/core-concepts/model-querying-finders/
