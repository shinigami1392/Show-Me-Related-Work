import Vue from 'vue';
import ListBox from '@/components/ListBox';

describe('ListBox.vue', () => {
  it('should render software engineering', () => {
    const Constructor = Vue.extend(ListBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('software engineering'); 
  });

  it('should render catagories machine learning', () => {
    const Constructor = Vue.extend(ListBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('machine learning'); 
  });

  it('should render catagories web development', () => {
    const Constructor = Vue.extend(ListBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('web development'); 
  });

  /*
  it('Negative test case: should not render catagories mobile development', () => {
    const Constructor = Vue.extend(ListBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('mobile development'); 
  });
  */
  
})
