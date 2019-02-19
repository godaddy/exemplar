# `@exemplar/storybook`

Add `storybook` and `exemplar` to your package

```bash
npm i --save-dev @exemplar/storybook @storybook/react @storybook/addons
```

Add storybook scripts to your `package.json`:

``` js
{
  "scripts": {
    "storybook": "start-storybook -p 9001 -c ./node_modules/@exemplar/storybook"
  }
}
```

Before you can run storybook you will need create some `@exemplar` style
examples: see the [example structure in a nutshell]

[example structure in a nutshell]: ../../examples/README.md
