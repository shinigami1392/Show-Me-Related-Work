import Vue from 'vue';
import Grid from '@/components/Grid';

describe('Grid.vue', () => {
  it('should render paper tilte as A threshold selection method from gray-level histograms', () => {
    const Constructor = Vue.extend(Grid)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('A threshold selection method from gray-level histograms'); 
  });

  it('should render authors name as N Otsu', () => {
    const Constructor = Vue.extend(Grid)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('N Otsu'); 
  });

  it('should render the tilte Pattern Analysis and Machine Intelligence', () => {
    const Constructor = Vue.extend(Grid)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('Pattern Analysis and Machine Intelligence'); 
  });

  it('should render  authors name as  J Canny', () => {
    const Constructor = Vue.extend(Grid)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('J Canny'); 
  });
  

  it('should render the tilte Pattern Analysis and Machine', () => {
    const Constructor = Vue.extend(Grid)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('Pattern Analysis and Machine'); 
  });

  it('should render  authors name as  Geman', () => {
    const Constructor = Vue.extend(Grid)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('Geman'); 
  });
  

  it('should render the tilte Workshop on statistical', () => {
    const Constructor = Vue.extend(Grid)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('Workshop on statistical'); 
  });

  it('should render  authors name as  Willamowski', () => {
    const Constructor = Vue.extend(Grid)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('Willamowski'); 
  });
  
  /*
  it('Negative test case: should not render invalid paper title', () => {
    const Constructor = Vue.extend(Grid)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('application development'); 
  });
  */

  
})
