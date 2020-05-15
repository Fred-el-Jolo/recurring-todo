import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import Vue from "vue";

import Counter from "./counter.js";

Vue.component("counter", Counter);

export default {
  title: "Counter",
  decorators: [withKnobs],
  parameters: {
    backgrounds: [
      { name: "twitter", value: "#00aced", default: true },
      { name: "facebook", value: "#3b5998" }
    ]
  }
};

export const Standard = () => "<counter></counter>";
