import Vue from 'vue';
import LinkInfoBox from '@/components/LinkInfoBox';

describe('LinkInfoBox.vue', () => {
  it('should render link source name', () => {
    const Constructor = Vue.extend(LinkInfoBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('Methods in machine learning'); 
  });

  it('should render link destination name', () => {
    const Constructor = Vue.extend(LinkInfoBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('art of machine learning'); 
  });

  it('should render number of upvotes', () => {
    const Constructor = Vue.extend(LinkInfoBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('12'); 
  });

  
  it('Negative test case: should not render invalid  link destination name', () => {
    const Constructor = Vue.extend(LinkInfoBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('intro to web development'); 
  });
  
  
})
