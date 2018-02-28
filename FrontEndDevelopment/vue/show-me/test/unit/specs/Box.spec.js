import Vue from 'vue';
import Box from '@/components/Box';

describe('Box.vue', () => {
  it('should render boxheader as Papers Information', () => {
    const Constructor = Vue.extend(Box)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('Papers Information'); 
  })

  it('should render boxheader as Relationship Information', () => {
    const Constructor = Vue.extend(Box)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('Relationship Information'); 
  })

  it('should render boxheader as List of papers', () => {
    const Constructor = Vue.extend(Box)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('List of papers'); 
  })

  it('should render boxheader as Comments on relationship', () => {
    const Constructor = Vue.extend(Box)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('Comments on relationship'); 
  })

  it('should render boxheader as Show Me Related Work', () => {
    const Constructor = Vue.extend(Box)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('Show Me Related Work'); 
  })

  /* //Negative test case
  it('should render boxheader as BoxHeader6', () => {
    const Constructor = Vue.extend(Box)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('BoxHeader6'); 
  })*/
})
