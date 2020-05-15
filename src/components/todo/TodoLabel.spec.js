// import regeneratorRuntime from 'regenerator-runtime';
import { mount } from '@vue/test-utils';
import TodoLabel from './TodoLabel.vue';
import '../../utils/filters';

describe('TodoLabel', () => {
  const initWrapper = (propsData) => {
    return mount(TodoLabel, {
      propsData,
    });
  };

  const destroyWrapper = (wrapper) => {
    wrapper.destroy();
  };

  it('renders the correct markup', () => {
    const wrapper = initWrapper({
      todo: {
        title: 'Launch a unit test on a TodoLabel',
        priority: 'A',
        creationDate: '2020-05-11',
        completionDate: '2020-05-12',
        isDone: true,
        projects: ['dev', 'vuejs', 'recurring-todo'],
        contexts: ['jest', 'unit-test'],
        dueDate: '2020-05-13',
        isAuto: false,
        isRecurrent: false,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();

    destroyWrapper(wrapper);
  });

  // it's also easy to check for the existence of elements
  /*
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
*/
});
