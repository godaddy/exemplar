//
// Since Storybook addons require code in both:
//
// - ./.storybook/config.js
// - ./.storybook/addons.js
//
// We must enable the consumer to dynamically add their own
// addons to `examples/.setup/addons.js`.
//
try {
  //
  // TODO (@crobbins): define a convention for the export shape
  // from this configuration so that `examples/.setup/decorators.js`
  // is not necessary for the simple case.
  //
  if (EX_SETUP_ADDONS) { // eslint-disable-line no-undef
    require(EX_SETUP_ADDONS); // eslint-disable-line no-undef
  }
} catch (ex) {
  console.error(ex); // eslint-disable-line no-console
}
