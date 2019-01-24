//
// The **BOTTOM** of the rabbit hole: it is not possible to modify
// the `webpack` configuration for the `storybook` “manager”. i.e.
// the code outside the iFrame hosting stories
// See: https://github.com/storybooks/storybook/blob/next/lib/core/src/server/manager/manager-webpack.config.js#L35-L60
//
// To work around this (for now until we patch @storybook/core), all
// `start-storybook` commands must be executed with:
//
// STORYBOOK_CWD="`cwd`" start-storybook
//
// This hooks into the existing `process.env` wiring in the hard-coded
// DefinePlugin used today.
//
try {
  require(`${process.env.STORYBOOK_CWD}/examples/.setup/addons.js`);
} catch (ex) {
  console.dir(ex);
}
