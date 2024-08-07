# Nobel Laureates Frontend

This is the frontend for the Nobel Laureates Project. It is implemented with React + TS on Vite. Styled with TailwindCSS using [Flowbite components](https://flowbite.com).
The backend for this application is at [Nobel Laureates Backend](https://github.com/Sadeeptha-B/nobel-laureates-backend)
The application is MERN stack based (React, MongoDB, Express and Node, with TypeScript)

## App features

- Login and Signup pages with Form validation
- reCAPTCHA verification for Login and Signup pages.
- Authentication with JWT with Access Tokens and Refresh Tokens (Implemented by storing Access Tokens in Local Storage and Refresh Tokens in Cookie Storage).
- Auto logout on access token expiry
- Displaying a List of Laureates in an infinite scrollable page
- Implementing filters in infinite scrollable page
- Laureate Details page with the Laureate's extensive profile
- Allow user to post comments under a specific laureate

## Running locally

Clone this github repository with

```
git clone https://github.com/Sadeeptha-B/nobel-laureates-frontend.git
```

It is recommended to run this app with Node.js v20.15.1 (currently LTS). Install the dependencies for the project with `npm install` at the root directory of the project

The app requires a .env file to store secrets. Create .env file at the root directory with the following

```
VITE_APP_SITE_KEY=
VITE_APP_API_URL=
```

Site key is required for reCAPTCHA. API URL is for the locally running backend. Instructions for setting up the backend are in it's repository linked above.

After setting up the .env file, run the project with

```
npm run dev
```
