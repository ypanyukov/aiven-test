# Test python application

### Prolog
I have used 2 common approaches for the application - flask and create-react-app.
It let me an ability to concentrate on implementation. But, for real application that is not the best approach.
The best approach from my prospective would be 2 separate application: backend and frontend.
Where frontend serves on static server and backend somewhere separately (any vm approach for example).

On client side I decided to do not use redux or even context because we don't have problem of props
drilling or anything else. Just one depth of components.

On backend side I decided to cache `/api/clouds` and filter on client side. 2 reasons:

1. List of data centers is almost static, and it would be possible to cache result of http://api.aiven.io/v1/clouds
or filter on client side - I picked client side
2. List of data center is too small and there is no big difference between client side and backend side.

P.S. It may be a security case, but since API is open, there is no any private information

### Pre-requirements
* python3
* venv
* Flask
* Flask-Caching
* nodejs + npm

You can use `sh bin/install.sh` to install dependencies.

P.S. it may not work in case of virtual environment. 

### Run command
Execute `sh bin/run.sh`

### Routes
* /api/clouds - returns list of clouds from https://api.aiven.io/v1/clouds. 
