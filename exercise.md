

# Architecture Decisions

Welcome!


# Routing

By using React Router, we can help keep the user on their page when they refresh rather than making them start over.

# Style Library

I use Material Design because they make a lot of great decisions off the bat when it comes to spacing, maintaining consistency in your typography. On top of Material Design, I add a Theme Provider in order to inject my brand-specific stylings, in this case what my primary and secondary colors are.

## ADA (American Disabilities Association)

Material Design additionally enforces strict rules to help you comply with ADA. In the case of images, the file Image.constants.js together with the Image.component.js file provide a streamlined approach to describe the location of the image as well as the description in order to help us ensure 100% ADA compliance.

# Backend

By using Firebase, I am able to quickly set up a database with the collections "items" and "users", and I can take advantage of the SDK to quickly interact with the database. 

## Security

Direct read/write to the database is prohibited and only enabled for the service account that resides in the Cloud Functions. Thee is no authentication/authorization system built-in, but provided we set up such a mechanism, we could establish authorization rules for accessing data by configuring "Rules" in the Firebase console. In the case that we steer clear from Firebase's in-house authentication mechanisms, we could use JWT tokens in either an Authorization Grant code flow or an Implicit Grant code flow (not recommended unless targeting IE) as described in the OAuth2.0 specification.

## Backend Cloud Functions

A ```v1``` route is used to designate that this is the first version of my mock REST API. This is written using Firebase Functions and Typescript is used throughout. The advantage of using serverless functions is that you don't have to maintain your own server and can focus your time on the business problems.

# Testing

I have added testing for the Currency.service.js file's ```convertToDollars``` function. To run the tests run ```npm run lint```

# Mobile Responsiveness

By taking advantage of the @media CSS selector, the app is usable on a mobile device as well as on a laptop or desktop computer.

# Hosting

Firebase Hosting is used to provide you with the simplest approach to spinning up the final product. To view a version of
the app running locally, ensure your Node.js version is at 10.13.0 or higher and run ```npm start```. Since the backend is serverless, no additional steps are needed.

# Room for improvement

- CORS could be set up for greater security.
- The app could be a bit more responsive on the mobile front
- The loading screen triggers twice when going from budget to checklist. I would move that component to a higher level to create a smoother experience
- "Optimistic UI", or the approach of rendering things with the expectation that the API data will match the results you pre-rendered could've been used, in this case for fetching the checklist items, to shorten the duration of the first loading screen.
- Error handling could use its own popup component rather than using the browser's un-stylized alert feature.
- The input for min/max where keystrokes push values from the right exclusively is a bit counterintuitive but was the best solution I could find in this short time to meet the requirement of formatting numbers in US currency. I imagine there is a good library for that somewhere.
