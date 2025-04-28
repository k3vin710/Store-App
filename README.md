# Awesome Superstore App

This repository contains the code and documentation for the **Awesome Superstore App**, a web application, database, and ETL system developed for a business use case simulating an e-commerce platform.

## Project Overview

This project involved designing and implementing robust database backends and associated components to support the core business operations of **Awesome Superstore Inc.**, an online furniture and office supplies retailer.

The key components developed are:

* **Online Transaction Processing (OLTP) Database:** Built using **MySQL** to handle day-to-day e-commerce transactions.
* **Database-Driven Web Application:** Developed with **React** for the frontend and **Node.js (Express.js)** for the backend API, interacting with the OLTP database.
* **Data Warehouse:** Built using **Oracle Database** for analytical processing and reporting.
* **ETL Workflow Scripts:** Processes designed to extract, transform, and load data from the OLTP database into the data warehouse using a Change Data Capture (CDC) process.

## Tech Stack

* React.js
* Node JS (Express.js)
* MySQL
* Oracle SQL

## Web Application

The React-based web application serves as the user interface for the online store, providing the following functionality:

### Functionality

* Product Browse and searching
* Shopping cart management
* Order placement and tracking
* User profile and password management
* Admin functionality to add new products

*(Refer to the diagram illustrating the web application architecture: `web-app-architecture`)*
The code for the web application's frontend and backend can be found inside the `awesome-superstore-backend` and `awesome-superstore-frontend` folders within this repository.

## Database

The project utilizes two separate database systems to support transactional and analytical needs:

* An **OLTP database** (**MySQL**) primarily for handling online transactions.
* A **Data Warehouse** (**Oracle Database**) designed for analytical queries and reporting.

The SQL scripts for setting up the **OLTP database** (MySQL) can be found inside the `awesome_superstore_db/mysql` folder within this repository.

## ETL Workflow

The ETL workflow is responsible for the crucial task of moving and transforming data from the OLTP database into the data warehouse, enabling business intelligence and analytics.

The process involves:

* Performing an initial full extract of data from the MySQL OLTP database, applying necessary transformations, and loading it into the Oracle data warehouse to establish a baseline dataset.
* Tracking the timestamps of full extracts using the `etl_extract_date` table to manage the CDC process.
* Executing periodic incremental extracts from MySQL, efficiently capturing only the data that has changed since the last extraction.
* Applying similar ETL transformations on these incremental changes and merging them into the corresponding data warehouse tables.

This systematic approach ensures ongoing synchronization of the data warehouse with the operational data, facilitating analytics based on the latest business activities.
