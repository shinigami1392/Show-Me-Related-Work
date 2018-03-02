import Vue from 'vue';
import ListBox from '@/components/ListBox';

describe('ListBox.vue', () => {
  it('should render catagories name as Mining and Learning with Graphs and Relations', () => {
    const Constructor = Vue.extend(ListBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('Mining and Learning with Graphs and Relations'); 
  });

  it('should render catagories name as Machine Learning for Computer Security', () => {
    const Constructor = Vue.extend(ListBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('Machine Learning for Computer Security'); 
  });

  it('should render catagories name as In Memory of Alexey Chervonenkis', () => {
    const Constructor = Vue.extend(ListBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('In Memory of Alexey Chervonenkis'); 
  });

  it('should render catagories name as Probabilistic Models of Link Structure', () => {
    const Constructor = Vue.extend(ListBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('Probabilistic Models of Link Structure'); 
  });

  it('should render catagories name as Multiple Instance Learning', () => {
    const Constructor = Vue.extend(ListBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('Multiple Instance Learning'); 
  });

  it('should render catagories name as Fast Signal Processing', () => {
    const Constructor = Vue.extend(ListBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('Fast Signal Processing'); 
  });

  it('should render catagories name as Software Engineering', () => {
    const Constructor = Vue.extend(ListBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('Software Engineering'); 
  });

  /*
  it('Negative test case: should not render catagories mobile development', () => {
    const Constructor = Vue.extend(ListBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('mobile development'); 
  });
  */
  
})
