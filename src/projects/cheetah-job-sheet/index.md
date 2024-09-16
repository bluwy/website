---
title: Cheetah Job Sheet
desc: Job sheet management tool
icon: timetable.svg
created: '2020-02-04'
links:
  - label: GitHub
    link: https://github.com/bluwy/cheetah-server
tags:
  - React
  - TypeScript
  - GraphQL
---

A job sheet management interface to plan and keep track of employees' daily tasks.

<!-- endexcerpt -->

Current development is halted because no Andriod devices were available to build the employee's app interface.

## What I've Learned

This was my first large project that have extensive use of backend technologies. Exploring the NodeJS ecosystem, I've experimented with various tools to built a GraphQL API, including Apollo Server, Prisma 2, Hasura, Nexus, Objection.js. I've finally settled with Nexus + Objection.js since it provided the most flexibility. I also focused more on unit-testing, notably with Jest to test the business logic.

For the frontend, the initial development was with Vue and Vuetify to create an admin dashboard. As the projects grow, Vuetify became a major blocker in extending certain features. Ultimately, the application was ported to React and material-ui, which provided more looser and composable components. The port was fairly quick and took roughly a week for a minimum viable product.
