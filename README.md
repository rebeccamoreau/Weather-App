## Weather App using Dark Sky API and JQuery ##
This Weather App uses Dark Sky API and JQuery to display the current weather and the weather for the next 8 hours and the next 6 days.

To use:
  1. Get API Key from https://darksky.net/dev/
  2. Create config.js in js folder
  3. In config.js write:
  
         var config = {
          MY_KEY : 'YOUR_API_KEY'
          }

To hide your API Key in your repo: 
  1. Create a .gitignore file
  2. In .gitignore write:
  
         config.js
