# Who's On

This simple StatEngine application demonstrates how to utilize protected resources.
The application first fetches the list of Fire Departments that have installed the application.
Then every 5 seconds, it prints each Fire Departments current time and shift.

# Running
```
npm i
CLIENT_ID=<client id> CLIENT_SECRET=<client secret> API_DOMAIN=statengine.io npm run start
```

# Example Output
```
Washington DC Fire & EMS Department: currently Sun Jan 13 2019 22:21:36 GMT-0500, shift: 4
Richmond Fire and Emergency Services: currently Sun Jan 13 2019 22:21:41 GMT-0500, shift: C
Washington DC Fire & EMS Department: currently Sun Jan 13 2019 22:21:41 GMT-0500, shift: 4
Richmond Fire and Emergency Services: currently Sun Jan 13 2019 22:21:46 GMT-0500, shift: C
Washington DC Fire & EMS Department: currently Sun Jan 13 2019 22:21:46 GMT-0500, shift: 4
```

# Contributing
```
npm run lint
```

