import Vue from 'vue';
import PaperInfoBox from '@/components/PaperInfoBox';

describe('PaperInfoBox.vue', () => {
  it('should render paper name', () => {
    const Constructor = Vue.extend(PaperInfoBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('Machine learning'); 
  });

  it('should render authors name', () => {
    const Constructor = Vue.extend(PaperInfoBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('CS Dojo'); 
  });

  it('should render url of the paper', () => {
    const Constructor = Vue.extend(PaperInfoBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('www.example.com'); 
  });

  it('should render year of the paper', () => {
    const Constructor = Vue.extend(PaperInfoBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('2002'); 
  });


  /*
  it('Negative test case: should not render catagories mobile development', () => {
    const Constructor = Vue.extend(PaperInfoBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('mobile development'); 
  });
  */
  
})
