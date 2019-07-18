# `./examples`

This directory serves as an exemplar for how you can use `@exemplar` for your
component library. This directory is up-to-spec, and uses every package
available in `@exemplar`. The base structure of this directory as follows:

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

`@exemplar` will use this file structure to automatically generate a `storybook`
for you.
