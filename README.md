# Command Executor utility

Command executor utility is used to execute command over REST APIs

## Prerequisites
* Node.js - Download and Install [Node.js](http://www.nodejs.org/download/)

## Quick Install
  The quickest way to get started with Command Executor Utility is to clone the project and utilize it like this:

  Install dependencies:

    $ cd command-executor
    $ npm install

  Then start the server using following command:

  	$ PORT=3001 node server.js 

  	PORT: Port number on which command executor utility server will run

  To use the command executor utility, please follow the following points:

    * Format: {{commandExecutorBaseURL}}/execute?command=<cmd to execute>
    * Note: 
      ** All the scripts / data / dumps must be stored in any arbitrary directory 
         structure of your choice, but that directory should be inside command-executor 
         directory.
      ** Suppose you have MySQL dump stored at location 
         <command-executor DIRECTORY>/app-name/1.0.0/mysql/dumps/app-init.sql
      ** Then you need to invoke the following through REST API to restore the dump
         **** {{commandExecutorBaseURL}}/execute?command=mysql -uroot test-db < app-name/1.0.0/mysql/dumps/app-init.sql

## Troubleshooting and Feedback
For any issues / feedback, please contact vREST Support <support@vrest.io>

## License
License MIT
