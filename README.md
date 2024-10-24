
# PH4 PROJECT: STORE MANAGEMENT SYSTEM
## Introduction
This is a Store Management System for a company that is used to check the stocks at any given time. This system is used at an engineering store, to minimize the current tools theft that was observed by the store department employees.
With this system, the user who is the store employee should be able to:
   - Add the stock to the store database.
   - Monitor how much stock of that item is at the store.
   - Stock transaction: Check the records to see if the stocks(tools) were returned once assigned.


## Project Overview
The project uses Vite React App for Frontend and Flask-RESTful API to access the Database, Backend.

Deployment:
  Static Site: https://store-management-system-7tfm.onrender.com
  Webservice: https://ph-4-project-tools-management-2.onrender.com

Also to access this project, `fork and clone` this repository in your terminal. Once you have successful done that, still in your terminal, to access the frontend side `npm run dev` in the `client` directory and to access the backend side (opening the server), run the virtual environment `pipenv shell` then run the server `python app.py`.


### Server
This is the Backend side of the management system. The server side of this directory consists of these main directories.
   - models.py
   - seed.py
   - app.py
   - app.db

  1. models.py
     This is where the tables of the database are set. We have four models namely:
       - Employee
       - StoreEmployee
       - Tools
       - ToolRecords
       - Users


      - Employee: It creates the `employees` table, The table consists of the company's employees and to be specific, the employees in the Technical side of the company. These could be engineers, technicians or even head of departments. The columns on the table has shows the id, name, department and role of the employee.

      - StoreEmployee: It creates the `store_employees` table. This table consists of the store employees only. The store employees are company employees too but we wanted them to stand out so that we can know who assigned a tool the other employees. The columns show the id, name and role of the store employee.

      - Tools: It creates the `tools` table. All the tools that are entered in the database go here. The columns show the id, name, brand,image, quantity and the date which the tool was bought.

      - ToolRecords: It creates the `toolrecords` table. This table maintains the relationship of the tables mentioned above to this one. It is therefore an association table. The Entity Relationship Diagram, ERD:

       ![DATABASE_ERD](./ENGINEERING%20STORE%20ERD.png)

      - Users: It creates the `users` table. It is used to for the authentication. For the users to access the application on the frontend side, they need to provide there username and password. 


  2. seed.py
     It consists of the sample data for the database. In the terminal in the server directory you run ```$ python seed.py``` on to enter the sample data in the database. Also by running the code, you will get list of the all the data on the terminal.


  3. app.py 
     It contains all the routes. The routes includes the CRUD operations for managing employees, store employees, tools and tool records. User registration, login and logout functions are also located here.
     The Api routes are defined using Flask-RESTful for structured resource-based endpoints. 
     Also through this file, we are able to establish a relationship with the frontend using Cross-Origin Resource Sharing (CORS). It allows the Flask server to specify external domains from which clients can access resources.
     So for you to run the server `$ python app.py` under the virtual environment as stated earlier.


  4. app.db
     This is the management system's database. The tables being defined at the models are created here. So we have the employees, store employees, tools, tool records and users tables here. The tables contain all the relevant details to be used at the frontend side.
     


### Client
This is the frontend part of the management system. It uses Vite React App. To access it, on the terminal, in the client directory type `npm run dev` then open the link provided on your browser.

In the React App, client-side routing was used. A NavBar is used to allow users to navigate between the routes. The routes are linked to the following pages in the App:

  - Home 
  - Add tool
  - Tools
  - Tool records
  - Login
  - Error 

  1. Login
     The Login page is used for authentication. It allows the user to login then App. This relies on the `user` table in the database for credentials. So if you are not in the database, you are locked out.

  2. Home
     After a successful login the user, will be met with a homepage that briefly introduces and describes what the App is all about.

  3. Add tool
     It contains a form that is used to add new tools that are brought in the store. The user is required to put the name, brand, number of tools brought and the image of the tool. When the details have been submitted, a card will appear below the form showing the details of that tool added. This relies on the POST/tools route of the API to access the database. 

  4. Tools
     The page shows all the tools or stock in the store in form of cards. One card shows the details of a tool. It also has two buttons that reduce or add the number of available tools. For example there are 10 hammers in total and a store employee assigns one hammer to a technician(an employee) he should click a button that reduces the number of available tools by one. When the hammer is returned, the store employee clicks the button that increases the available tools by one. This relies on the GET/tools route of the API to access the database.

   4. Tool records
     This displays a table that shows what tool has been taken(tool_id), who took it(employee_id), who assigned it (store_employee_id), date taken and date returned. Since the table only shows the IDs, the user(store employee) can click the link `view employee list` to check the employee as per the ID on the Employee Page. The same applies for the store employee, `view store employee list`. The update button only updates the date returned in the format, dd mm yyyy. 
     Note: The delete button has a password prompt. For the sake of the project, the password is '123'.


    5. Error Page
     When the user enters the URL with a wrong path, an error page will appear. The should therefore make the user to enter the correct path.


## REFERENCES
1. Login page: https://clerk.com/blog/building-a-react-login-page-template

2. Reading material on canvas

