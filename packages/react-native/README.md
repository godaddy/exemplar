# `@exemplar/storybook-native`

Add storybook and exemplar to your package:

```bash
npm i --save-dev \
  @storybook/react @storybook/react-native \
  @exemplar/storybook @exemplar/storybook-native
```

Add storybook scripts to your `package.json` (assuming you also want to
preview web as well):

``` js
{
  "scripts": {
    "preview": "start-storybook -p 9001 -c @exemplar/storybook",
    "preview:native": "storybook -c @exemplar/storybook-native" 
  }
}
```

Before you can run storybook you will need create some `@exemplar` style
examples. See: [Example structure in a nutshell]

[Example structure in a nutshell]: ./README.md#example-structure-in-a-nutshell.
