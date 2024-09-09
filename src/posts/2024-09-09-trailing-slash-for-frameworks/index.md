---
title: Trailing Slash for Frameworks
---

It turns out that putting a `/` at the end of a URL can be a big deal. Should you put it? Or should you not? Or should you simply make both work? Why is this even a problem in the first place?!

<!-- end-excerpt -->

This guide unravels the concepts and intricacies of all that, with a focus for framework maintainers and library authors who want to understand trailing slash better and implement a consistent experience for everyone.

If you're a developer, an end-user, or just curious, you'll see what goes behind the scenes and understand better why it matters!

## Table of Contents

<!-- toc -->

## Which is better?

There's 4 ways to handle trailing slashes, but is there a superior option?

1. Disallow trailing slashes. You cannot access a path with a trailing slash.
2. Enforce trailing slashes. You cannot access a path without a trailing slash (unless the path is the root or points to a resource directly, like `example.com/data.json`).
3. Allow either trailing slash or no trailing slash on per-route basis. For example, if you're using a framework and define a path at `src/routes/file.jsx`, then it can only be served at `/file` and not `/file/`. Vice-versa, if you define a path at `src/routes/folder/index.jsx`, then it can only be served at `/folder/` and not `/folder`. Or if the framework allows explicitly defining a kind of `trailingSlash` option for a route.
4. Allow both trailing slashes and no trailing slashes, which would serve the same content.

> When you cannot access a path, it doesn't mean that it'll return a [404 not found](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404). It could also return a [301 redirect](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301) to the correct path and doesn't degrade the user experience. It'll depend on how the server is configured.

Among these 4 options, all of them are equally good except for no4. Choosing either no1, no2, or no3 is a matter of preference, and frameworks could choose either as the default as long as the file output path or request handling are correct, which we'll discuss later.

If you're a framework author who would not like to have a `trailingSlash` option, no3 is perfect as you can use the directory structure to depict the trailing slash behaviour. If you'd like to put less emphasis on the directory structure, a `trailingSlash: 'never' | 'always'` option would be needed to make things explicit, whether it's applied to all routes by default (no1 or no2) or on a per-route basis (no3).

The reason why no4 isn't recommended is because a path with or without a trailing slash is considered as two distinct paths, even if they have the same content. The downsides include:

1. Search engines may be confused of which is the main URL to index.
2. Users may access the same content from different paths, which could cause confusion when sharing links.
3. Extra work needed to ensure relative references are correct.
4. The HTTP request may be cached seperately, leading to duplicated work.

While no1 and no3 can be fixed with a [`<link rel="canonical">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel#canonical) tag or a [`<base>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base) tag. It's a lot more work to get right, and we could avoid the downsides in the first place by performing a 301 redirect to the preferred main URL. But with that said, it's still fair for frameworks to support this option as long as it's done right and users are informed of the caveats.

## Getting it right

### Origins

HIstorically, trailing slash comes from the need and a set of rules that make URLs pretty:

| Pretty URL                 | Full URL                        |
| -------------------------- | ------------------------------- |
| `example.com`              | `example.com/index.html`        |
| `example.com/`             | `example.com/index.html`        |
| `example.com/file`         | `example.com/file.html`         |
| `example.com/folder/`      | `example.com/folder/index.html` |
| `example.com/folder/stuff` | `example.com/folder/stuff.html` |

It's shorter, cleaner, and much more memorable. It's a simple rule that servers can use to automatically check for `index.html` or `.html` when you're accessing a path.

As you may notice, the directory structure of the full URLs depict the pretty URLs and whether it requires a trailing slash or not, similar to option no3 as discussed in the [Which is better?](#which-is-better) section.

The basis of this mapping is **important** to later understand how links are resolved, especially for relative references. Even though servers today may not have the actual HTML file physically on the filesystem (e.g. server-rendered pages), it's easier to reason about certain behaviours when you treat it as if it were. And of course futureproofing yourself if you decide to prerender the page later on.

### Relative references

The most important effect of trailing slashes is how it affects relative references being resolved. The table from the previous section shows how it's able to prettify URLs without affecting relative references. Let's use this file tree to consider some cases:

```txt
├── index.html
├── file.html
├── folder
│   ├── index.html
│   └── stuff.html
```

Case A:

1. `/folder/index.html` would like to reference `/folder/stuff.html`, it would use `./stuff.html`.
2. Given `example.com/folder/`, `./stuff.html` will resolve to `example.com/folder/stuff.html`. ✅
3. It should not drop the trailing slash like `example.com/folder` because the relative path would resolve to `example.com/stuff.html`, which does not exist. ❌

Case B:

1. `/file.html` would like to reference `/folder/stuff.html`, it would use `./folder/stuff.html`.
2. Given `example.com/file`, `./folder/stuff.html` will resolve to `example.com/folder/stuff.html`. ✅
3. It should not have the trailing slash like `example.com/file/` because the relative path would resolve to `example.com/file/folder/stuff.html`, which does not exist. ❌

While the example cases above show relative HTML references, the same applies to CSS, images, and other assets. And they don't always appear as `<a>` or `<link>` tags, some may be defined in JavaScript and it becomes tricky to fix them unless you have full control over the code.

As such, it is important to make sure file servers and server-rendered pages respect the significance of the trailing slash for relative references to resolve correctly.

<blockquote>
<details>
<summary>Counterpoints</summary>

**1. Writing an HTML file in anticipation of being served on a different URL**

Let's say you have a `/folder/index.html` file, but the relative references within it are written in anticipation that the file will be served at `example.com/folder` instead of `example.com/folder/`. Technically this won't cause any problems because the relative links will point to the right paths.

However, in practice this makes reading the HTML file harder to reason about as you can't rely on the physical filesystem path to infer the URL path. Not all servers will be able to support this case unless there's an option to opt-in.

If you wanted to serve from `example.com/folder` in the first place, you should rename the file as `/folder.html`. A server that allows you to serve from a different path is more of a band-aid than fixing the source of the problem.

**2. No relative paths**

If you know that there's no relative paths in your app, then technically relative references shouldn't be a problem at all. However, it's usually not possible to guarantee that especially for user-written content, and limits your framework from supporting relative base: a feature that allows users to mount their server to any base of a URL, making it portable.

</details>
</blockquote>

### Support both trailing slash and no trailing slash

If you (as a framework or library author) decide to make accessing a path with or without a trailing slash to both work, here's some things to be aware of:

1. Relative references (as mentioned in the previous section) should apply to both paths. Meaning you may have to generate different relative links when rendering both paths.
2. If you prerender the page, you'd have to prerender it twice as two different files to make accessing the content with or without a trailing slash to both work.
3. You should encourage users to select the preferred path using [`<link rel="canonical">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel#canonical) tag to indicate the main URL to index.
4. Inform of the effects of duplicated HTTP caching due to the different paths.

<blockquote>
<details>
<summary>Counterpoints</summary>

**1. The `<base>` tag**

With the `<base>` tag, theoretically you could only need to render the page once, and serve it at both paths with or without a trailing slash. For example with `/folder/index.html`, you can serve it at `example.com/folder` and use `<base href="/folder/">` to resolve the relative references correctly.

However, this has the assumption that the content isn't derived from the current request URL. For example, if the user has access to the request URL (`example.com/folder` or `example.com/folder/`) and returns different content based on it, then you'd have to treat them as separate paths in order to render it correctly. So it may not always work without accepting the caveats.

**2. Not HTML content**

If the routes are not HTML content, but instead APIs like JSON data, then technically the above doesn't apply to you, except no4. You could be hitting cases where your API is being cached twice depending on the trailing slash, which may not be ideal for your server or end-users.

However, if the API route is `example.com/api.json`, it's usually not needed to append a trailing slash due to the extension, so in this case you can treat as only supporting the non-trailing slash path.

</details>
</blockquote>

### Redirects

If you decide to enforce trailing slashes or disallow them, instead of returning a [404 not found](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404) for the incorrect path, you can consider returning a [301 redirect](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301) to the correct path.

This way if you have links to the incorrect path, or if the user manually types the link, they'll get a better user experience being redirected to the correct path, and also allows search engines to index the right page.

### Development and production consistency

Last but not least, make sure that any trailing slash behaviour and configuration applies to both development and production environments.

For example, if a page will be prerendered in production, but dynamically rendered in development, you should ensure that the URL the users can access from is the same as in production. If you can access `localhost:3000/folder` in development, but only `example.com/folder/` in production, users will be bound to hitting relative references issues.

## Ecosystem review

The section below takes data from https://github.com/slorber/trailing-slash-guide and expands on certain points from the discussion above. (Give the repo a star!)

### Hosting providers

<div id="hosting-providers">

| Host                  | Settings                                         | Url                                                                       | /file                                                                              | /file/                                                                            | /file.html                                                                             | /folder                                                                            | /folder/                                                                              | /folder/index.html                                                                                 | /both                                                                            | /both/                                                                            | /both.html                                                                             | /both/index.html                                                                               |
| --------------------- | ------------------------------------------------ | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| GitHub Pages          |                                                  | [link](https://slorber.github.io/trailing-slash-guide)                    | [✅](https://slorber.github.io/trailing-slash-guide/file)                          | [💢 404](https://slorber.github.io/trailing-slash-guide/file/)                    | [✅](https://slorber.github.io/trailing-slash-guide/file.html)                         | [➡️ /folder/](https://slorber.github.io/trailing-slash-guide/folder)               | [✅](https://slorber.github.io/trailing-slash-guide/folder/)                          | [✅](https://slorber.github.io/trailing-slash-guide/folder/index.html)                             | [✅](https://slorber.github.io/trailing-slash-guide/both)                        | [✅](https://slorber.github.io/trailing-slash-guide/both/)                        | [✅](https://slorber.github.io/trailing-slash-guide/both.html)                         | [✅](https://slorber.github.io/trailing-slash-guide/both/index.html)                           |
| Netlify               | Default: Pretty Urls on                          | [link](https://trailing-slash-guide-pretty-url-enabled.netlify.app)       | [✅](https://trailing-slash-guide-pretty-url-enabled.netlify.app/file)             | [➡️ /file](https://trailing-slash-guide-pretty-url-enabled.netlify.app/file/)     | [✅](https://trailing-slash-guide-pretty-url-enabled.netlify.app/file.html)            | [➡️ /folder/](https://trailing-slash-guide-pretty-url-enabled.netlify.app/folder)  | [✅](https://trailing-slash-guide-pretty-url-enabled.netlify.app/folder/)             | [✅](https://trailing-slash-guide-pretty-url-enabled.netlify.app/folder/index.html)                | [✅](https://trailing-slash-guide-pretty-url-enabled.netlify.app/both)           | _[➡️ /both](https://trailing-slash-guide-pretty-url-enabled.netlify.app/both/)_   | [✅](https://trailing-slash-guide-pretty-url-enabled.netlify.app/both.html)            | [✅](https://trailing-slash-guide-pretty-url-enabled.netlify.app/both/index.html)              |
| Netlify               | Pretty Urls off                                  | [link](https://trailing-slash-guide-pretty-url-disabled.netlify.app)      | [✅](https://trailing-slash-guide-pretty-url-disabled.netlify.app/file)            | _[✅](https://trailing-slash-guide-pretty-url-disabled.netlify.app/file/)_        | [✅](https://trailing-slash-guide-pretty-url-disabled.netlify.app/file.html)           | _[✅](https://trailing-slash-guide-pretty-url-disabled.netlify.app/folder)_        | [✅](https://trailing-slash-guide-pretty-url-disabled.netlify.app/folder/)            | [✅](https://trailing-slash-guide-pretty-url-disabled.netlify.app/folder/index.html)               | [✅](https://trailing-slash-guide-pretty-url-disabled.netlify.app/both)          | _[✅](https://trailing-slash-guide-pretty-url-disabled.netlify.app/both/)_        | [✅](https://trailing-slash-guide-pretty-url-disabled.netlify.app/both.html)           | [✅](https://trailing-slash-guide-pretty-url-disabled.netlify.app/both/index.html)             |
| Vercel                | Default: cleanUrls=false trailingSlash=undefined | [link](https://vercel-cleanurls-false-trailingslash-undefined.vercel.app) | _[💢 404](https://vercel-cleanurls-false-trailingslash-undefined.vercel.app/file)_ | [💢 404](https://vercel-cleanurls-false-trailingslash-undefined.vercel.app/file/) | [✅](https://vercel-cleanurls-false-trailingslash-undefined.vercel.app/file.html)      | _[✅](https://vercel-cleanurls-false-trailingslash-undefined.vercel.app/folder)_   | [✅](https://vercel-cleanurls-false-trailingslash-undefined.vercel.app/folder/)       | [✅](https://vercel-cleanurls-false-trailingslash-undefined.vercel.app/folder/index.html)          | _[✅](https://vercel-cleanurls-false-trailingslash-undefined.vercel.app/both)_   | [✅](https://vercel-cleanurls-false-trailingslash-undefined.vercel.app/both/)     | [✅](https://vercel-cleanurls-false-trailingslash-undefined.vercel.app/both.html)      | [✅](https://vercel-cleanurls-false-trailingslash-undefined.vercel.app/both/index.html)        |
| Vercel                | cleanUrls=false trailingSlash=false              | [link](https://vercel-cleanurls-false-trailingslash-false.vercel.app)     | _[💢 404](https://vercel-cleanurls-false-trailingslash-false.vercel.app/file)_     | [💢 404](https://vercel-cleanurls-false-trailingslash-false.vercel.app/file/)     | [✅](https://vercel-cleanurls-false-trailingslash-false.vercel.app/file.html)          | _[✅](https://vercel-cleanurls-false-trailingslash-false.vercel.app/folder)_       | _[➡️ /folder](https://vercel-cleanurls-false-trailingslash-false.vercel.app/folder/)_ | [✅](https://vercel-cleanurls-false-trailingslash-false.vercel.app/folder/index.html)              | _[✅](https://vercel-cleanurls-false-trailingslash-false.vercel.app/both)_       | _[➡️ /both](https://vercel-cleanurls-false-trailingslash-false.vercel.app/both/)_ | [✅](https://vercel-cleanurls-false-trailingslash-false.vercel.app/both.html)          | [✅](https://vercel-cleanurls-false-trailingslash-false.vercel.app/both/index.html)            |
| Vercel                | cleanUrls=false trailingSlash=true               | [link](https://vercel-cleanurls-false-trailingslash-true.vercel.app)      | _[💢 404](https://vercel-cleanurls-false-trailingslash-true.vercel.app/file)_      | [💢 404](https://vercel-cleanurls-false-trailingslash-true.vercel.app/file/)      | [✅](https://vercel-cleanurls-false-trailingslash-true.vercel.app/file.html)           | [➡️ /folder/](https://vercel-cleanurls-false-trailingslash-true.vercel.app/folder) | [✅](https://vercel-cleanurls-false-trailingslash-true.vercel.app/folder/)            | [✅](https://vercel-cleanurls-false-trailingslash-true.vercel.app/folder/index.html)               | _[➡️ /both/](https://vercel-cleanurls-false-trailingslash-true.vercel.app/both)_ | [✅](https://vercel-cleanurls-false-trailingslash-true.vercel.app/both/)          | [✅](https://vercel-cleanurls-false-trailingslash-true.vercel.app/both.html)           | [✅](https://vercel-cleanurls-false-trailingslash-true.vercel.app/both/index.html)             |
| Vercel                | cleanUrls=true trailingSlash=undefined           | [link](https://vercel-cleanurls-true-trailingslash-undefined.vercel.app)  | [✅](https://vercel-cleanurls-true-trailingslash-undefined.vercel.app/file)        | _[✅](https://vercel-cleanurls-true-trailingslash-undefined.vercel.app/file/)_    | [➡️ /file](https://vercel-cleanurls-true-trailingslash-undefined.vercel.app/file.html) | _[✅](https://vercel-cleanurls-true-trailingslash-undefined.vercel.app/folder)_    | [✅](https://vercel-cleanurls-true-trailingslash-undefined.vercel.app/folder/)        | _[➡️ /folder](https://vercel-cleanurls-true-trailingslash-undefined.vercel.app/folder/index.html)_ | [✅](https://vercel-cleanurls-true-trailingslash-undefined.vercel.app/both)      | _[✅](https://vercel-cleanurls-true-trailingslash-undefined.vercel.app/both/)_    | [➡️ /both](https://vercel-cleanurls-true-trailingslash-undefined.vercel.app/both.html) | _[➡️ /both](https://vercel-cleanurls-true-trailingslash-undefined.vercel.app/both/index.html)_ |
| Vercel                | cleanUrls=true trailingSlash=false               | [link](https://vercel-cleanurls-true-trailingslash-false.vercel.app)      | [✅](https://vercel-cleanurls-true-trailingslash-false.vercel.app/file)            | [➡️ /file](https://vercel-cleanurls-true-trailingslash-false.vercel.app/file/)    | [➡️ /file](https://vercel-cleanurls-true-trailingslash-false.vercel.app/file.html)     | _[✅](https://vercel-cleanurls-true-trailingslash-false.vercel.app/folder)_        | _[➡️ /folder](https://vercel-cleanurls-true-trailingslash-false.vercel.app/folder/)_  | _[➡️ /folder](https://vercel-cleanurls-true-trailingslash-false.vercel.app/folder/index.html)_     | [✅](https://vercel-cleanurls-true-trailingslash-false.vercel.app/both)          | _[➡️ /both](https://vercel-cleanurls-true-trailingslash-false.vercel.app/both/)_  | [➡️ /both](https://vercel-cleanurls-true-trailingslash-false.vercel.app/both.html)     | _[➡️ /both](https://vercel-cleanurls-true-trailingslash-false.vercel.app/both/index.html)_     |
| Vercel                | cleanUrls=true trailingSlash=true                | [link](https://vercel-cleanurls-true-trailingslash-true.vercel.app)       | _[➡️ /file/](https://vercel-cleanurls-true-trailingslash-true.vercel.app/file)_    | _[✅](https://vercel-cleanurls-true-trailingslash-true.vercel.app/file/)_         | _[➡️ /file/](https://vercel-cleanurls-true-trailingslash-true.vercel.app/file.html)_   | [➡️ /folder/](https://vercel-cleanurls-true-trailingslash-true.vercel.app/folder)  | [✅](https://vercel-cleanurls-true-trailingslash-true.vercel.app/folder/)             | [➡️ /folder/](https://vercel-cleanurls-true-trailingslash-true.vercel.app/folder/index.html)       | _[➡️ /both/](https://vercel-cleanurls-true-trailingslash-true.vercel.app/both)_  | _[✅](https://vercel-cleanurls-true-trailingslash-true.vercel.app/both/)_         | _[➡️ /both/](https://vercel-cleanurls-true-trailingslash-true.vercel.app/both.html)_   | _[➡️ /both/](https://vercel-cleanurls-true-trailingslash-true.vercel.app/both/index.html)_     |
| Cloudflare Pages      |                                                  | [link](https://trailing-slash-guide.pages.dev)                            | [✅](https://trailing-slash-guide.pages.dev/file)                                  | [➡️ /file](https://trailing-slash-guide.pages.dev/file/)                          | [➡️ /file](https://trailing-slash-guide.pages.dev/file.html)                           | [➡️ /folder/](https://trailing-slash-guide.pages.dev/folder)                       | [✅](https://trailing-slash-guide.pages.dev/folder/)                                  | [➡️ /folder/](https://trailing-slash-guide.pages.dev/folder/index.html)                            | [✅](https://trailing-slash-guide.pages.dev/both)                                | [✅](https://trailing-slash-guide.pages.dev/both/)                                | [➡️ /both](https://trailing-slash-guide.pages.dev/both.html)                           | [➡️ /both/](https://trailing-slash-guide.pages.dev/both/index.html)                            |
| Render                |                                                  | [link](https://trailing-slash-guide.onrender.com)                         | [✅](https://trailing-slash-guide.onrender.com/file)                               | _[✅](https://trailing-slash-guide.onrender.com/file/)_                           | [✅](https://trailing-slash-guide.onrender.com/file.html)                              | _[✅](https://trailing-slash-guide.onrender.com/folder)_                           | [✅](https://trailing-slash-guide.onrender.com/folder/)                               | [✅](https://trailing-slash-guide.onrender.com/folder/index.html)                                  | _[✅](https://trailing-slash-guide.onrender.com/both)_                           | [✅](https://trailing-slash-guide.onrender.com/both/)                             | [✅](https://trailing-slash-guide.onrender.com/both.html)                              | [✅](https://trailing-slash-guide.onrender.com/both/index.html)                                |
| Azure Static Web Apps |                                                  | [link](https://red-dune-0d2e38c03.azurestaticapps.net)                    | [✅](https://red-dune-0d2e38c03.azurestaticapps.net/file)                          | [➡️ /file](https://red-dune-0d2e38c03.azurestaticapps.net/file/)                  | [✅](https://red-dune-0d2e38c03.azurestaticapps.net/file.html)                         | _[✅](https://red-dune-0d2e38c03.azurestaticapps.net/folder)_                      | [✅](https://red-dune-0d2e38c03.azurestaticapps.net/folder/)                          | [✅](https://red-dune-0d2e38c03.azurestaticapps.net/folder/index.html)                             | [✅](https://red-dune-0d2e38c03.azurestaticapps.net/both)                        | [✅](https://red-dune-0d2e38c03.azurestaticapps.net/both/)                        | [✅](https://red-dune-0d2e38c03.azurestaticapps.net/both.html)                         | [✅](https://red-dune-0d2e38c03.azurestaticapps.net/both/index.html)                           |

</div>

> Dimmed cells indicate that the path may lead to relative references issues or returns the incorrect content.

As a framework, ideally it should able to support all of the hosting providers, which is possible but with many edge cases to keep in mind. Note that the data above focuses on static file serving only.

<div id="hosting-notes">

1. Cloudflare Pages provides the best default that serves all files correctly with the prettiest URLs, and doesn't expose the relative references issues.
2. GitHub Pages is a close follow-up, but doesn't serve with the prettiest URLs.
3. Netlify _(Pretty Urls on)_ is able to serve all correctly except for `/both/`, which should have rendered the `/both/index.html` file.
4. Netlify _(Pretty Urls off)_, Render, and Azure Static Web Apps serves all files very leniently and exposes risks to relative references issues if accessed from the incorrect path. Usually these are only ideal if the relative references in your HTML files are incorrect in the first place, or if it didn't matter.
5. Vercel with any configuration seem to not get any generally right.
   - In all cases, `both/index.html` and `both.html` are very finicky, they don't exactly serve the right file that you expect.
   - With `cleanUrls=true`, it's more likely to clean some paths wrongly. It depends on the `trailingSlash` option instead of the actual file existence.
   - With `trailingSlash=undefined`, it exposes risks to relative references issues if accessed from the incorrect path.
   - With `trailingSlash=false`, only `file.html` variants will tend to serve correctly, other variants may not.
   - With `trailingSlash=true`, only `folder/index.html` variants will serve correctly, other variants may not
6. If we ignore the `both` tests since they're rare, then:
   - Cloudflare Pages is still the best.
   - GitHub Pages, Netlify _(Pretty Urls on)_, and Vercel _(cleanUrls=false,trailingSlash=true)_ are a close follow-up, but they don't serve the prettiest URLs.
   - Netlify _(Pretty Urls off)_, Render, Azure Static Web Apps, and Vercel _(cleanUrls=false,trailingSlash=undefined)_ are still lenient and expose risks to relative references issues if accessed from the incorrect path.
   - Vercel _(cleanUrls=false,trailingSlash=false)_, _(cleanUrls=true,trailingSlash=undefined)_, _(cleanUrls=true,trailingSlash=false)_, and _(cleanUrls=true,trailingSlash=false)_ has many relative references issues.

</div>

To be fair to Vercel, their configuration works best if the respective framework used to deploy also supports a `trailingSlash: boolean` option. But if you're using a framework without the option, or if you're uploading mixed `file.html` and `folder/index.html` files manually, it's easy to get into the wrong configuration that messes with your site.

For server-rendered pages, as long as your server followed the guide above regarding relative references and redirects, you're good to go. However, keep in mind that some hosting providers, like Vercel, may rewrite the paths before reaching your server (in Vercel's case, the `trailingSlash` option affects it). And for providers that also support hosting your server, in most cases, its static file serving will take a higher priority before hitting your server, which can also sometimes be configurable.

### Frameworks

- Next. Default: `'/path.html'`. [Configurable](https://nextjs.org/docs/app/api-reference/next-config-js/trailingSlash).
- Nuxt. Default: `'/path/index.html'`. [Non-configurable](https://github.com/nuxt/nuxt/issues/15462).
- SvelteKit. Default: `'/path.html'`. [Configurable](https://kit.svelte.dev/docs/page-options#trailingslash).
- Astro. Default: `'/path/index.html'`. [Configurable](https://docs.astro.build/en/reference/configuration-reference/#buildformat).
- Docusaurus. Default: `'/path/index.html'`. [Configurable](https://docusaurus.io/docs/docusaurus.config.js#trailing-slash).

## Conclusion

Trailing slashes can be tricky, but as long as you follow the guidelines above, you and your users should be able to get a consistent deployment experience on any hosting provider.

For a final recap:

1. Only allow trailing slash or no trailing slash globally or per-route. Avoid supporting paths with both trailing slash and no trailing slash for the same content.
2. Ensure relative references in a HTML file is correct depending on whether the file is served with or without a trailing slash (inferred from the rules of pretty URLs).
3. If you decide to support both trailing slash and no trailing slash for a route, make sure that relative references still work, and inform users of the caveats.
4. Where possible, return a 301 redirect to the correct path instead of a 404 not found for incorrect paths.
5. Make sure to test against hosting providers if you're unsure how certain routes interact. Certain providers may have unique behaviours or configurations that allow you to achieve what you want.

And that's it! May you deal with trailing slash once and never again.

## Additional resources

- https://github.com/slorber/trailing-slash-guide
- https://developers.google.com/search/blog/2010/04/to-slash-or-not-to-slash
- https://www.seroundtable.com/google-trailing-slashes-url-24943.html
- https://ahrefs.com/blog/trailing-slash/

<style>
  .markdown table td {
    overflow-wrap: anywhere;
  }

  #hosting-providers {
    overflow-x: auto;
  }
  #hosting-providers table {
    margin-bottom: 0;
  }
  #hosting-providers table td {
    overflow-wrap: unset;
  }
  #hosting-providers table td em {
    opacity: 0.5;
  }

  #hosting-notes em {
    opacity: 0.7;
  }
</style>
