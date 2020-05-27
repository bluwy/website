---
title: Release for Reddit
desc: Automate Reddit release post
icon: github-action.svg
featured: true
links:
  - label: Repository
    link: https://github.com/BjornLuG/release-for-reddit-action
  - label: Marketplace
    link: https://github.com/marketplace/actions/release-for-reddit
tags:
  - GitHub Action
---

A GitHub Action to automate submitting a release post on Reddit. This was my second submission for [GitHub Hackathon](https://githubhackathon.com/).

<!-- endexcerpt -->

## What I've Learned

After the first submission for [Substitute String](https://github.com/marketplace/actions/substitute-string), I wanted to do something more useful. This action gave me the opportunity to work with external APIs which includes authentication, authorization and calling endpoints.

I had some trouble with Reddit's API which oddly doesn't work with my main account. I had to create a new account which surprisingly worked straight away. New accounts are throttled when submitting posts or comments so it was also great chance for me to handle the custom timeout response.
