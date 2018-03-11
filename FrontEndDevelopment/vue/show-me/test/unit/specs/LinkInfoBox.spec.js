import Vue from 'vue';
import LinkInfoBox from '@/components/LinkInfoBox';

describe('LinkInfoBox.vue', () => {
  it('should render link source name as Methods in machine learning', () => {
    const Constructor = Vue.extend(LinkInfoBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('Methods in machine learning'); 
  });

  it('should render link destination name as art of machine learning', () => {
    const Constructor = Vue.extend(LinkInfoBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('art of machine learning'); 
  });

  it('should render number of upvotes count as 12', () => {
    const Constructor = Vue.extend(LinkInfoBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('12'); 
  });

  it('should render link source name as congitive computing with vision', () => {
    const Constructor = Vue.extend(LinkInfoBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('congitive computing with vision'); 
  });

  it('should render link destination name as Cognitive computing', () => {
    const Constructor = Vue.extend(LinkInfoBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('Cognitive computing'); 
  });

  it('should render number of upvotes count as 4', () => {
    const Constructor = Vue.extend(LinkInfoBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('4'); 
  });

  /*
  it('Negative test case: should not render invalid  link destination name', () => {
    const Constructor = Vue.extend(LinkInfoBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('intro to web development'); 
  });
  */
  
})
