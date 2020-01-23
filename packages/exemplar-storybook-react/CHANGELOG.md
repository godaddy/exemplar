# CHANGELOG

### 2.0.0

- Remove `addons` method as Storybook 5.x behaves differently with addons.
- Lock storybook to `5.2.8` and `sass-loader` at `7.x`.

### 1.1.1

- Add missing `dependencies`.

### 1.1.0

- Migrate to full Storybook preset based workflow. This is implemented
  as as backwards compatible. It is trivial since the backwards
  compatibility is preset is simply a `presets.js` 
  file requiring `./index.js`. 

### 1.0.0

- Rename from `@exemplar/storybook-react` for clarity around purpose & scope.

### @exemplar/storybook@2.0.0

- Update to `storybook/react@5`

### @exemplar/storybook@1.0.0

- [#6] Initial open source release

[#6]: https://github.com/godaddy/exemplar/pull/6
