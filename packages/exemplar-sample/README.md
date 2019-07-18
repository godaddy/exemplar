# `@exemplar/sample`

The `./examples` directory serves as an exemplar for how you can use 
`@exemplar` for your component, component library, or design system. We strive
keep it up-to-spec with the latest developments in `@exemplar`, and use every package available in the `@exemplar` ecosystem. 

The base structure of this directory as follows:

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

`@exemplar` will use this file structure to automatically generate a
`storybook` for you.

## Usage

To see how `@exemplar` works just install dependencies and run the appropriate
`npm` script:

```
# Install dependencies
npm install

# Run Storybook (web)
npm run storybook

# Run Storybook (native)
npm run storybook:ios
npm run storybook:android

```
