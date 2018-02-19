import Vue from 'vue';
import Box from '@/components/Box';

describe('Box.vue', () => {
  it('should render correct contents in the header template', () => {
    const Constructor = Vue.extend(Box)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('This is a box component'); 
  })
})
