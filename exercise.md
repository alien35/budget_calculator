
# Architecture Decisions

Welcome!


# Routing

By using React Router, we can help keep the user on their page when they refresh rather than making them start over.

# Style Library

I use Material Design because they make a lot of great decisions off the bat when it comes to spacing, maintaining consistency in your typography. On top of Material Design, I add a Theme Provider in order to inject my brand-specific stylings, in this case what my primary and secondary colors are.

## ADA (American Disabilities Association)

Material Design additionally enforces strict rules to help you comply with ADA. In the case of images, the file Image.constants.js together with the Image.component.js file provide a streamlined approach to describe the location of the image as well as the description in order to help us ensure 100% ADA compliance.

# Backend

By using Firebase, I am able to quickly set up a database with the collections "items" and "users", and I can take advantage of the web SDK to quickly interact with the database. 

## Backend Security

There is no security at the moment since there is no authentication/authorization built-in, but provided we set up such a mechanism, we could establish authorization rules for accessing data by configuring "Rules" in the Firebase console. In the case that we steer clear from Firebase's in-house authentication mechanisms, we could use JWT tokens in either an Authorization Grant code flow or an Implicit Grant code flow as described in the OAuth2.0 specification.

## Backend Functions

A ```v1``` route is used to designate that is is the first version of my mock REST API. This is written using Firebase Functions and Typescript is used throughout.

# Testing

To show some of my testing abilities, I have added testing for the Currency.service.js file. To run the tests run ```npm run lint```

# Mobile Responsiveness

By taking advantage of the @media CSS selector, the app is usable on a mobile device as well as on a laptop or desktop computer.