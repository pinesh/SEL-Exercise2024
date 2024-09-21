# SEL Assessment, React todo list:

This is my implementation of the following prompt.
 
_Create a react Todo list application that has the following features:_

1. Task Management

   - Add new tasks
   - Edit existing tasks
   - Delete tasks
   - Mark tasks as complete

2. The application should contain a task list and task detail page, Users shall be able to navigate between the 2 pages.


##  The implementation:

The following project is a create-react-app with react-router-dom as the only additional package to handle the page changes. 
It's written in typescript and uses a provider to handle all the features outlined in  **[1]** .

The tasks are saved to local storage on change and will persist on refreshes/reloads. 


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). and should be run in the project directory with

### 1: `npm install`

to install all the relevant packages 


### 2: `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.





