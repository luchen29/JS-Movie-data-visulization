# Web-Development


============ Readme ==========
* The entry port for this node.js project is app.js file.

* In app.js - Routers including:
===============================================================================================================================
Router Name   |   Methods  |  Usage and function					                                    | which file to render/redirect
===============================================================================================================================
"/"           | GET        | For landing page; Will render the landing page 		              | landing.ejs 
              |            |
"/visual"     | GET        | For data interactively visualization page; 		                  | visual.html 
              |            | Will Render the visualization page.
              |            |
"/login"      | GET & POST | For user login page; Will render the login page first;		        | login.ejs 
              |            | Get the post from user and redirect to the useraccount page.
              |            |              
"/register"   | GET & POST | For new user register page; Will render the register  		        | register.ejs 
              |            | page first; Get the post from user and redirect to 
              |            | useraccount page.
              |            |
"/logout"     | GET        | For user account logout; Will redirct to the Home page.		      | landing.ejs 
              |            |
"/search"     | GET        | For movies collections page, and searching page; Will render	    | search2.ejs 
              |            | the search page. Filter data from mongodb and display.
              |            |
"/useraccount"| GET        | For user account profile page; Will render the useraccount page.	| useraccount.ejs 
===============================================================================================================================

* pagkage.json including all the dependencies used in this project.

* In views including all the .ejs files. HTML Partials are extracted as header.ejs and footer.ejs

* In modules including the two Mongoose Schema created. They will be required in the App.js file.

* In public including all the data used in this project; CSS files for all the .ejs file and .html file; all .js files that supports the function.


********************************************************************************************************************************
REMINDER:

* If the .ejs file could not be opened, you could access to the cloud9 workspace to see the code.

* I've made it an OPEN project on AWS CLOUD9. You should be able to access to the project by link: https://ide.c9.io/luchen/web-development-pj 

  This project is in folder --> Movie

*********************************************************************************************************************************
