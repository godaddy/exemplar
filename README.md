# exemplar
Storybook rocket fuel to launch structured examples of React & React Native components


## Basic Usage

Add storybook and exemplar to your package

```bash
npm i -D @storybook/react @storybook/react-native @exemplar/react @exemplar/react-native
```

Add storybook scripts to your `package.json`

``` js
{
  "scripts": {
    "preview": "start-storybook -p 9001 -c @exemplar/react"
    "preview:native": "storybook -c @exemplar/react-native" 
  }
}
```

Before you can run storybook you will need create some `@exemplar` style stories:


## Example Structure 

``` bash
stories/
  index.js        # Main Entrypoint
  index.native.js # Main Native Entrypoint

# Stories
  *.js        # Run on Web & Native
  web/*.js    # Run on Web only
  web/*.md    # Optional markdown description for each example
  native/*.js # Run on  Native only

```

Checkout our `examples` directory for starter projects. 


## Project management

This repo is managed by the `mono-repos` package which comes with CLI and Node.js
API for managing packages. It's already installed as devDependency, but you
can also install it locally:

```
npm install --global mono-repos
```

### Install

We've provided an installation script that will automatically go through
all the packages, install the dependencies, and symlink them if needed. This
process is run automatically when you run:

```
npm install
mono --install
```

In the root of the repository. You can always run `npm install` in the package
folder as well, but that will not setup the correct symlinks for you.

### Testing

You can either run tests separately, or run them all at once (recommended for new
releases).

```
npm test

mono --test
```

For testing individual packages

```
npm run test:react
npm run test:react-native


mono --test react
mono --test react-native
```

If this isn't your thing, you can also still go in to the package's directory
and run the `npm test` command there for the individual test.

### Publishing

The publishing is automated using the `mono` command as well, it ensures that
following happens in the correct order, and format so we can still correctly
track individual publishes in our `git tags`:

- Increases version number.
- Create dist commit.
- Create the correct git tag.
- Push to repo.
- Publish package.

To bump all packages:

```
npm run publish -- --release major
mono --publish --release major
```

If the `--release` flag is omitted we assume it's a `patch` release by default.
When you want to release an individual package:

```
npm run publish:react
npm run publish:react-native

mono --publish react
mono --publish react-native
```

[mono]: https://github.com/3rd-Eden/mono-repos/mono.md