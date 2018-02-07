import List from '@/components/List';
import Vue from 'vue';

describe('ListBox.vue', () => {

  it('displays items from the list', () => {
      // our test goes here
      // build component
        const Constructor = Vue.extend(ListBox);
        const ListComponent = new Constructor().$mount();
    // assert that component text contains items from the list
        expect(ListComponent.$el.textContent).to.contain('play games');

  })
})