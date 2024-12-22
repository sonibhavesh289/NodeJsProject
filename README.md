1. Module_Example :
   - This is simple start of node js, where it shows how to write own module and use it in other file.
   - To run
       - npm start (added "start": "node hello" in script section of package.json)

2. Sample_App 
    - Here we written some sample server app, which show how to route with http -> also have to use extra url module for getting query info 
    - Same things get achieved by express with better code readability no need to use url module. 
    - Must visit guide page for more info https://expressjs.com/en/guide/routing.html
    - Different methods to end request response cycle - https://expressjs.com/en/guide/routing.html#:~:text=)%0A%7D)-,Response%20methods,-The%20methods%20on 

3. Rest_API (Create The Rest Api and understand Middlware)
    - understand use of the middlware ex. Here created the requestTime middlware which get called for all route who set the requiestTime property in req ogject which used in next function.
    - Used https://www.mockaroo.com/ To generate json data.
    - List of APIs 
        - /api/users/     GET Method  (Get all users data)
        - /api/users/     POST Method (Create user)
        - /api/users/:id   GET Method  (Get the user with id)
        - /api/users/:id   PATCH Method  (Update the user)
        - /api/users/:id   DELETE Method (Delete the user)
    - Used Postman to test the API 

4. Rest_API_V2_Segregated_Code (Segregate the code)
    - segregate the code of Rest_API according to MVC (model, view, controller).
    - Controller files having function what to do when any route hit. Separete handler created in controllers/user.js for all /api/user routes.
    - All custom middlware moved to saperate file middlware/index.js 

5. Rest_API_MongoDB_MVC (Rest API with mongooDB) 
    - All data transfer happening in local mongoodb server instead of simple json file as we done in all previous modules.
    - separate connection.js and model/user.js created.
    - Same APIs supported as listed above in Rest_API section ex. http://localhost:8000/api/users/   GET or POST method.
    
    
Guide Pages :
    - Event loop - https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick
    - Express APIs guide : https://expressjs.com/en/4x/api.html#express -> what happen when do require('express') https://stackoverflow.com/questions/42631107/when-express-is-required-is-it-a-function-or-an-object
    - Express guide https://expressjs.com/en/guide/routing.html - looks for other topics as well.
