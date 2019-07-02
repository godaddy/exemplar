# `@exemplar/native-storybook`

Run React Native storybook through exemplar for a React Component.

### Install

Add `@exemplar/native-storybook` to your dependencies.

```bash
npm i --save-dev @exemplar/native-storybook
```

Add ios and android run scripts to your `package.json`:

``` js
{
  "scripts": {
    "storybook:native:ios": "exemplar-native --platform ios",
    "storybook:native:android": "exemplar-native --platform android"
  }
}
```

### CLI flags

The `exemplar-native` CLI supports the following flags.
- `--platform`: define the platform to use, defaults to `ios`.
- `--entry`: define a custom path for the storybook examples, defaults to `[cwd]/examples/native`.

### Setting up stories

Before you can run storybook you will need create some `@exemplar` style
examples: see the [example structure in a nutshell].

[example structure in a nutshell]: ../../examples/README.md
