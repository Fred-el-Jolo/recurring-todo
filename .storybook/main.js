module.exports = {
  stories: ["../stories/**/*.stories.js", "../src/components/**/*.stories.js"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-knobs/register",
    "@storybook/addon-actions/register",
    "@storybook/addon-storysource",
    "@storybook/addon-viewport/register",
    "@storybook/addon-backgrounds/register"
  ]
};
