# Architecture Decisions

Welcome!


# Routing

By using React Router, we can help keep the user on their page when they refresh rather than starting over

# Style Library

I use Material Design because they make a lot of great decisions off the bat when it comes to spacing, maintaining consistency in your typography. On top of Material Design, I add a Theme Provider in order to inject my brand-specific stylings, in this case what my primary and secondary colors are.

## ADA (American Disabilities Association)

Material Design additionally enforces strict rules to help you comply with ADA. In the case of images, the file Image.constants.js together with the Image.component.js file provide a streamlined approach to describe the location of the image as well as the description in order to help us ensure 100% ADA compliance.

# Backend

By using Firebase, I am able to quickly set up a database with the collections "items" and "users", and I can take advantage of the web SDK to quickly interact with the database. 

## Backend Security

There is no security at the moment since there is no authentication/authorization built-in, but provided we set up such a mechanism, we could establish authorization rules for accessing data by configuring "Rules" in the Firebase console.

## Backend Functions

While a custom REST API was not necessary since I could just interact with the Firebase SDK. I do provide a cloud function that seeds the database. It is written in Typescript per instructions. The advantage of Typescript is you can prevent bugs by enforcing what a data object can look like at any given moment. Classes written with Typescript further provide the benefit of serving as a reference guide.