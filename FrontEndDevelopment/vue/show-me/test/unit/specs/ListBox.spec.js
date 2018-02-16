import Vue from 'vue';
import ListBox from '@/components/ListBox';

describe('ListBox.vue', () => {
  it('should render correct contents from the list of catagories', () => {
    const Constructor = Vue.extend(ListBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('software engineering'); 
  })
})
