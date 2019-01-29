# `@exemplar/storybook-native`

Add storybook and exemplar to your package

```bash
npm i --save-dev \
  @storybook/react @storybook/react-native \
  @exemplar/storybook @exemplar/storybook-native
```

> Want to have `react-native` support too? See: [@exemplar/storybook-native]

Add storybook scripts to your `package.json` (assuming you also want to
preview web as well):

``` js
{
  "scripts": {
    "preview": "start-storybook -p 9001 -c @exemplar/storybook" 
  }
}
```

Before you can run storybook you will need create some `@exemplar` style
examples. See: [Example structure in a nutshell]

[@exemplar/storybook-native]: ./packages/react/README.md
[Example structure in a nutshell]: ./README.md#example-structure-in-a-nutshell.
