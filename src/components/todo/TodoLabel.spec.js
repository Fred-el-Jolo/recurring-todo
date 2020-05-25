// import regeneratorRuntime from 'regenerator-runtime';
import { mount } from '@vue/test-utils';
import TodoLabel from './TodoLabel.vue';
import '../../utils/filters';
import { lightDom } from '../../utils/test-utils';

describe('TodoText/TodoLabel', () => {
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

  it("doesn't break with null todo object", () => {
    const wrapper = initWrapper({
      todo: null,
    });

    expect(lightDom(wrapper.html())).toEqual('<p class="todo-label"></p>');

    destroyWrapper(wrapper);
  });

  it("doesn't break with undefined todo object", () => {
    const wrapper = initWrapper();

    expect(lightDom(wrapper.html())).toEqual('<p class="todo-label"></p>');

    destroyWrapper(wrapper);
  });

  it("doesn't break with todo containing null properties", () => {
    const wrapper = initWrapper({
      todo: {
        title: null,
        priority: null,
        creationDate: null,
        completionDate: null,
        isDone: null,
        projects: null,
        contexts: null,
        dueDate: null,
        isAuto: null,
        isRecurrent: null,
      },
    });

    expect(lightDom(wrapper.html())).toEqual('<p class="todo-label"></p>');

    destroyWrapper(wrapper);
  });
});
