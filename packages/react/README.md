# `@exemplar/storybook`

Run React Native storybook through exemplar for a React Component.

### Install

Add `storybook` and `exemplar` to your package

```bash
npm i --save-dev @exemplar/storybook @storybook/react@5
```

Add storybook scripts to your `package.json`:

``` js
{
  "scripts": {
    "storybook": "start-storybook -p 9001 -c ./node_modules/@exemplar/storybook"
  }
}
```

### Setting up stories

Before you can run storybook you will need create some `@exemplar` style
examples: see the [example structure in a nutshell]

[example structure in a nutshell]: ../../examples/README.md
