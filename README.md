# `@exemplar`

:rocket: Documentation [Storybook] rocket fuel for your components.

## Supported Platforms

- [Storybook]
  - [React]
  - [React Native]

## Motivation

There are a number of very powerful tools for previewing and show casing live examples of components that support multiple frameworks and multiple platforms.

**Then why make this!?** Great question! There are several reasons:

1. **Support "[Examples Best Practices]" by DEFAULT:** cut out the cruft from
  your examples. Be clear, concise, and "Copy Paste Ready".
2. **Interoperability First** with the proliferation of tools for previewing
  components there has yet to be a decoupled structure that can be used across
  multiple tools. While each tool or platform is working towards a better
  developer experience they are not concerned with one another. Although
  [standards proliferation] will always be an issue, but taking an
  **Interoperability First** approach we can cross-pollinate across tools
  without becoming yet another CLI to learn.

### Examples Best Practices: explained

- **Clear `require` / `import` usage**: prefer `require('your-module')` vs.
  a relative path such as `require('../../')`;
- **"Copy Paste Ready":** a good example can be dropped into an application
  with little to no changes necessary.
- **Hide Example Presentation:** the consumers of your components don't have
  to know anything about your example framework (e.g. [Storybook], [Docz],
  etc.).
- **Supports Design Documentation:** the _why of your UX_ is side-by-side with
  the _why of your Component API._

## Example structure

The basic structure for your examples is as follows:

``` bash
examples/
  # Stories
  *.js          # Runs on all platforms
  web/*.js      # Runs on Web only
  native/*.js   # Runs on mobile platforms only

  # Setup
  .setup/
    aliases.json # Webpack aliases
    shared.scss  # Global styles
```

Checkout our [`examples` directory][examples] for a starter project.

## Local Development & Releases

This repo is managed by the `lerna` package which comes with CLI and
Node.js API for managing packages. It's already installed as `devDependency`,
but you can also install it locally:

```
npm install --global lerna
```

### Install

We've provided an installation script that will automatically go through all
the packages, install the dependencies, and symlink them if needed. This
process is run automatically when you run:

```
npm install
```

In the root of the repository. You can always run `npm install` in the package
folder as well, but that will not setup the correct symlinks for you.

### Testing [![Build Status](https://travis-ci.com/godaddy/exemplar.svg?branch=master)](https://travis-ci.com/godaddy/exemplar)

You can either run tests separately, or run them all at once (recommended for
new releases).

```
npm test
```

If this isn't your thing, you can also still go in to the package's directory
and run the `npm test` command there for the individual test.

### Publishing

The publishing is automated using the `lerna` command as well, it ensures that
following happens in the correct order, and format so we can still correctly
track individual publishes in our `git tags`:

- Increases version number.
- Create dist commit.
- Create the correct git tag.
- Push to repo.
- Publish package.

To bump all relevant packages:

```
npx lerna version minor
npx lerna publish
```

[Storybook]: https://storybook.js.org
[React]: ./packages/storybook-react
[React Native]: ./packages/storybook-react-native

[Examples Best Practices]: #examples-best-practices-explained
[standards proliferation]: https://xkcd.com/927/
[examples]: ./packages/exemplar-samples#readme
[Docz]: https://docz.site
