# `@exemplar/storybook-react-native`

Run React Native Storybook for a React Component that's using the consistent
example structure defined by exemplar.

### Install

Add `@exemplar/storybook-react-native` to your dependencies.

```bash
npm i --save-dev @exemplar/storybook-react-native
```

Add ios and android run scripts to your `package.json`:

``` js
{
  "scripts": {
    "storybook:ios": "exemplar-native --platform ios",
    "storybook:android": "exemplar-native --platform android"
  }
}
```

### CLI flags

The `exemplar-native` CLI supports the following flags:

- `--platform`: define the platform to use, defaults to `ios`.
- `--entry`: define a custom path for the storybook examples, defaults to `[cwd]/examples/native`.

### Setting up stories

Before you can run storybook you will need create some `@exemplar` style
examples: see the [example structure in a nutshell].

[example structure in a nutshell]: ../exemplar-sample/README.md#readme
