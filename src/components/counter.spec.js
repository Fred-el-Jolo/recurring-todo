import regeneratorRuntime from "regenerator-runtime";
import { mount } from "@vue/test-utils";
import Counter from "./counter";

describe("Counter", () => {
  const initWrapper = () => {
    return mount(Counter);
  };

  const destroyWrapper = wrapper => {
    wrapper.destroy();
  };

  it("renders the correct markup", () => {
    const wrapper = initWrapper();

    expect(wrapper.html()).toContain('<span class="count">0</span>');

    destroyWrapper(wrapper);
  });

  // it's also easy to check for the existence of elements
  it("has a button", () => {
    const wrapper = initWrapper();

    expect(wrapper.contains("button")).toBe(true);

    destroyWrapper(wrapper);
  });

  it("button click should increment the count", () => {
    const wrapper = initWrapper();

    expect(wrapper.vm.count).toBe(0);
    const button = wrapper.find("button");
    button.trigger("click");
    expect(wrapper.vm.count).toBe(1);

    destroyWrapper(wrapper);
  });

  it("button click should increment the count text", async () => {
    const wrapper = initWrapper();

    expect(wrapper.text()).toContain("0");
    const button = wrapper.find("button");
    await button.trigger("click");
    expect(wrapper.text()).toContain("1");

    destroyWrapper(wrapper);
  });
});
