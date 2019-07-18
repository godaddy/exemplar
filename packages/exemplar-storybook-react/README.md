# `@exemplar/storybook-react`

Run Storybook for a React Component that's using the consistent example
structure defined by exemplar.

### Install

Add `storybook` and `exemplar` to your package

```bash
npm i --save-dev @exemplar/storybook-react @storybook/react@5
```

Add storybook scripts to your `package.json`:

``` js
{
  "scripts": {
    "storybook": "start-storybook -p 9001 -c ./node_modules/@exemplar/storybook-react"
  }
}
```

### Setting up stories

Before you can run storybook you will need create some `@exemplar` style
examples: see the [example structure in a nutshell]

[example structure in a nutshell]: ../exemplar-sample/README.md#readme
