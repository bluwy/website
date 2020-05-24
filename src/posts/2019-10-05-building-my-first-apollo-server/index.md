---
title: Building My First Apollo Server
date: "2019-10-05T02:00:27.000Z"
---

I recently got interested in GraphQL whilst building a new server. I had experience with the REST infrastructure before so this post will go into details on some things I faced during the learning process.

If you're not familiar with either REST or GraphQL, they are methods for requesting information from a server. This post will go into some technical details of both technologies. Here are links to [REST](https://restfulapi.net/) and [GraphQL](https://graphql.org/) for more information.

## GraphQL is more manageable

I started by reading the whole documentation on GraphQL before I even got started. The topic alone got me interested in some intuitive ways GraphQL solves from the usual REST API.

Since GraphQL is static-typed, the code looks clearer as to what does what. You don't have to look at its implementation to know what it will do since everything is declared upfront in the request.

## Starting with Apollo server

I didn't dig straight into a vanilla GraphQL server, instead, I chose Apollo since it provided some great out-of-the-box configuration.

The documentation also provides many nice GraphQL best practices for beginners.

The only difference I found between vanilla GraphQL and Apollo is the term `models` and `datasources` respectively, which both refers to the service to query the database. `models` define type classes respective to the schema's types, whereas `datasources` define a domain of a schema.

## Easy, but slightly hard

Starting out with simple queries was a breeze. As complex at it seems, there's not much configuration needed to get started. Spinning up a small test was as easy as a REST API.

But once the codebase gets bigger, a pattern slowly emerges, `schema`, `resolvers` and `datasources`. These 3 layers of abstraction were so important I wished I realized it sooner.

Simply put:

- `schema` is the endpoints written in GraphQL.
- `resolvers` control the input and output between `schema` and `datasources`.
- `datasources` queries the database.

## Directory structure

This one was a bit tricky since GraphQL is unopinionated about the structure, but luckily I found a [great article](https://hackernoon.com/three-ways-to-structure-your-graphql-code-with-apollo-server-4788beed89db) explaining ways to organize the layers.

Finally, I went with the domain-oriented structure since it makes sense to group things by its features rather than by its functionaility.

## Authentication was tricky

Since my project has both public and private APIs, I needed to manually add auth guards on my `datasources`. It was rather tedious, but there should be a better way of doing it that I'm missing.

## Awesome Apollo Client

I used [Vue](https://vuejs.org) for the front-end and used [Vue Apollo](https://vue-apollo.netlify.com) for the client. Setting up a simple query was like magic. Everything worked as expected.

## Client pagination headache

Apollo Client provides great support for retrieving paginated queries, but I had an issue with its cache system.

After adding or removing an item, I wanted to clear the pagination cache since the item may affect the ordering of the query. The documentation provides no way of clearing the cache, so finally, I used some workaround that manually deletes the cache It wasn't a solid approach, but it works.

## Conclusion

The journey was pleasant, even with its quirks. I can see why GraphQL gained much popularity in recent years. It's best for big organizations to manage their endpoints.

With that said, I would still use GraphQL for my own projects. I liked the code organization and it's easier to manage in the long run.

Thanks for reading :)
