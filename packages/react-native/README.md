# `@exemplar/storybook-native`

Add storybook and exemplar to your package:

```bash
npm i --save-dev \
  @storybook/react @exemplar/storybook \
  @storybook/react-native @exemplar/storybook-native
```

Add storybook scripts to your `package.json` (assuming you also want to
preview web as well):

``` js
{
  "scripts": {
    "preview": "start-storybook -p 9001 -c ./node_modules/@exemplar/storybook",
    "preview:native": "storybook -c ./node_modules/@exemplar/storybook-native"
  }
}
```

Before you can run storybook you will need create some `@exemplar` style
examples. See: [Example structure in a nutshell]

[Example structure in a nutshell]: ./README.md#example-structure-in-a-nutshell.
