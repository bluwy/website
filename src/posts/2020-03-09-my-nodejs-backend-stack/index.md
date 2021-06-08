---
title: My NodeJS Backend Stack
date: '2020-03-09T20:02:55.000Z'
---

The [NodeJS][nodejs] ecosystem is large and there are many ways to build your server. In about 6 months of learning backend work, I finally came out with my preferred tech stack.

In this post, I'll talk about some key findings of the various tech stacks I've used. The table of contents below lists the stacks in chronological order of my 6-month journey.

**TL;DR**: [Apollo][apollo-server], [Nexus][nexus], [Objection.js][objection], [TypeScript][typescript] and [PostgreSQL][postgres]. And [Prisma 2][prisma2] once it matures.

**Update 5/6/2020**: The Prisma team has changed a few terms since I last written this post. Notably `Nexus` => `Nexus Schema`, `Prisma` => `Prisma 1` and `Prisma 2` => `Prisma`. However, I did not update the new terms in this post since I have not used its newer features yet.

## Table of Contents

<!-- toc -->

## Background

The project needed to build an admin-like dashboard. That means that the server needs near **one-to-one mapping** of the database table to the client.

Besides, with functionality such as pagination, dynamic sorting and filtering, it was clear that the server should be able to **scale** effectively when it starts to have more data.

The server also relies on **heavy business logic** to implement a custom login process, custom id generation and more...

I had previous experience with REST API for some simple projects but this time I went for [GraphQL][graphql] (and also [TypeScript][typescript]) since I'm a fan of type-safety and curious to learn them.

I also used [PostgreSQL][postgres] for the database, but any relational database should work too.

Let's get started. Whoo~

## Apollo Server

The simplest GraphQL server can be easily built with [Apollo][apollo-server]. I started with a simple server to grasp the basics of GraphQL, and it was surprisingly easy to build!

However, the naive me used the bare-bones [`pg`][pg] driver and wrote raw queries to the PostgreSQL database. While this isn't too bad of an idea, it certainly doesn't scale as well.

For one, it's very prone to errors without proper name-checks to the database. This means that I would often have typos which were hard to debug.

But most importantly, generating dynamic queries is a pain to work with raw queries.

Needless to say, I went to find another solution.

## Apollo + Nexus + Prisma 2

Apollo served the base of all my projects, it makes setting up any kind of GraphQL servers trivially easy.

[Nexus][nexus] ([will be known as Nexus Schema in the future](https://github.com/prisma-labs/nexus/issues/373)) provides a nice **code-first approach** to writing GraphQL servers compared to Apollo's schema-first approach.

The [Prisma 2][prisma2] ecosystem proves a radical approach to writing NodeJS server. Equipped with an [query builder][prisma2-client], [migration tool][prisma2-migrate] and a [database IDE][prisma2-studio], it's by far the best developer experience for NodeJS.

Also, Nexus and Prisma blends well together since they're both developed by the same team anyway.

Writing business logic was very **straight forward** without any boilerplate. Prisma 2 even have **built-in dynamic sorting and filtering** for the GraphQL APIs which is as simple as a single line of code!

With that said, Prisma 2 still needs time to mature and is not much ready for production. It currently has its own caveats, including unable to define cascade relations and only case-sensitive search.

In the meantime, I went for some other alternatives.

## Hasura

[Hasura][hasura] had been appearing almost everywhere when I was searching for Prisma 2. Hasura was more of a full opt-in solution for building GraphQL servers.

I was lucky enough to try out its recent v1 release, and it was a breeze to start with.

The dashboard was pretty much all you need to **do almost everything**. From creating your database from scratch to auto-generated GraphQL APIs, you won't even have to write any code to have a server spinning.

It's an interesting approach compared to Prisma 2, but I had issues when it comes to customization.

The primary issue I had was with the **auto-generated GraphQL APIs**. At the time of writing, there was no way to say "hide" a database column from the generated API.

Moreover, I couldn't remove the generated aggregation queries or even rename them. Not to mention the APIs are in `snake_case` rather than the GraphQL standard `camelCase` or `PascalCase`.

It's a great tool for sure, but not for my use-case.

## Apollo + Nexus + TypeORM

As its name, [TypeORM][typeorm] is an ORM written in TypeScript. It provides type-safety out of the box with **two styles** of building queries.

Yes, two styles, one being the familiar **mongo style API**, and the other being a Knex-like **raw query builder**.

This wasn't much of a big deal, but once your query grows more and more complex, you would eventually have to use the raw query builder.

Besides that, the Mongo style API often had quirks when it doesn't work as intended, which you would then have to fall back to the raw query builder again.

But after using [Knex][knex], TypeORM's query builder is certainly **not as powerful**.

Since I wanted to have a Prisma 2 style sorting and filtering, TypeORM didn't provide the layer needed to dynamically build these.

## Apollo + Nexus + Objection.js

[Objection.js][objection] is built on top of Knex. It provides extra **typings** and **utilities** to construct a [Knex][knex] query.

Even though this means more code is needed, it provides the most **flexibility** without compromising on features.

This also means that I was able to create a Prisma 2 style sorting and filtering API from scratch and dynamically parse the GraphQL inputs (But that's another topic for another post).

Combined with the GraphQL [dataloader][dataloader], Objection.js makes it easy to load related models at once.

And this is my final tech stack I'm satisfied overall.

## Honorable Mentions

### Space Cloud

Although it's a very young project, I had tried [Space Cloud][space-cloud] just before Hasura to try out its capabilities.

While it's a nice alternative to [Firebase][firebase] (Firestore), it lacks a lot of features for complex use-cases.

It's a nice project to keep an eye out for, but certainly wasn't what I was looking for.

### TypeGraphQL

[TypeGraphQL][typegraphql] is more or less a competitor to [Nexus][nexus]. Both have different ways of providing type-safety to the code-first approach, but TypeGraphQL is mainly for TypeScript only since it uses experimental decorators.

Personally, I find Nexus to be more flexible in terms of extensibility (plugins) and JavaScript friendly too.

Nexus' syntax also feels cleaner, although at the expense that it relies heavily on the IDE to provide autocomplete and context to the code.

### TypeGql

Like TypeGraphQL, [TypeGql][typegql] is a more minimalistic counterpart with all the extra plugins, like query complexity, stripped off. It also uses the experimental TypeScript decorators.

Although there doesn't seem to be any further development from the author, it's still a functional library and a great alternative to TypeGraphQL.

## Conclusion

To conclude, my final tech stack is [Apollo][apollo-server], [Nexus][nexus], [Objection.js][objection], [TypeScript][typescript] and [PostgreSQL][postgres].

It's currently my preferred stack, though there might be some other XYZ libraries that I might not have heard of yet.

Although I had issues with some of the libraries above, they're still awesome to work with and each has its use cases.

Lastly, I'm still looking forward to [Prisma 2][prisma2]'s development. Once it matures and resolves most of its quirks, I'll switch over in a heartbeat.

Thanks for reading :)

[apollo-server]: https://www.apollographql.com/docs/apollo-server/
[nexus]: https://nexus.js.org/
[postgres]: https://www.postgresql.org/
[typescript]: https://www.typescriptlang.org/
[knex]: https://knexjs.org/
[objection]: https://vincit.github.io/objection.js/
[hasura]: https://hasura.io/
[typegraphql]: https://typegraphql.ml/
[typegql]: https://prismake.github.io/typegql/
[space-cloud]: https://spaceuptech.com/
[typeorm]: https://typeorm.io
[prisma2]: https://github.com/prisma/prisma2
[prisma2-client]: https://github.com/prisma/prisma-client-js
[prisma2-migrate]: https://github.com/prisma/migrate
[prisma2-studio]: https://github.com/prisma/studio
[graphql]: https://graphql.org/
[nodejs]: https://nodejs.org
[pg]: https://node-postgres.com/
[dataloader]: https://github.com/graphql/dataloader
[firebase]: https://firebase.google.com
