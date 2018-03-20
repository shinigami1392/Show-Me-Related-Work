import Vue from 'vue';
import Feedback from '@/components/Feedback';

describe('Feedback.vue', () => {
  it('should render user name as CS Dojo', () => {
    const Constructor = Vue.extend(Feedback)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('CS Dojo'); 
  });
  
  it('should render text as this is good relation', () => {
    const Constructor = Vue.extend(Feedback)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('this is good relation'); 
  });
  it('should render user name as Dr. Senapati', () => {
    const Constructor = Vue.extend(Feedback)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('Dr. Senapati'); 
  });
  
  it('should render text as this should be most voted relation', () => {
    const Constructor = Vue.extend(Feedback)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('this should be most voted relation'); 
  });
  it('should render user name as Dr.Pashupati', () => {
    const Constructor = Vue.extend(Feedback)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('Dr.Pashupati'); 
  });
  
  it('should render text as I am glad I found this website', () => {
    const Constructor = Vue.extend(Feedback)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('I am glad I found this website'); 
  });
})
