import Vue from 'vue';
import PaperInfoBox from '@/components/PaperInfoBox';

describe('PaperInfoBox.vue', () => {
  it('should render paper name as Machine learning', () => {
    const Constructor = Vue.extend(PaperInfoBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('Machine learning'); 
  });

  it('should render authors name as CS Dojo', () => {
    const Constructor = Vue.extend(PaperInfoBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('CS Dojo'); 
  });

  it('should render url of the paper www.example.com', () => {
    const Constructor = Vue.extend(PaperInfoBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('www.example.com'); 
  });

  it('should render year of the paper as 2002', () => {
    const Constructor = Vue.extend(PaperInfoBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('2002'); 
  });

  /*
  it('Negative test case: should not render invalid paper name', () => {
    const Constructor = Vue.extend(PaperInfoBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('mobile development'); 
  });
  */

 it('should render paper name as Machine learning', () => {
  const Constructor = Vue.extend(PaperInfoBox)
  const vm = new Constructor().$mount()
  expect(vm.$el.textContent).to.contain('Machine learning'); 
});

it('should render authors name as CS Dojo', () => {
  const Constructor = Vue.extend(PaperInfoBox)
  const vm = new Constructor().$mount()
  expect(vm.$el.textContent).to.contain('CS Dojo'); 
});

it('should render url of the paper www.example.com', () => {
  const Constructor = Vue.extend(PaperInfoBox)
  const vm = new Constructor().$mount()
  expect(vm.$el.textContent).to.contain('www.example.com'); 
});

it('should render year of the paper as 2002', () => {
  const Constructor = Vue.extend(PaperInfoBox)
  const vm = new Constructor().$mount()
  expect(vm.$el.textContent).to.contain('2002'); 
});

it('should render paper name as Genetic Algorithms and Machine Learning', () => {
  const Constructor = Vue.extend(PaperInfoBox)
  const vm = new Constructor().$mount()
  expect(vm.$el.textContent).to.contain('Genetic Algorithms and Machine Learning'); 
});

it('should render authors name as David E. GoldbergJohn H. Holland', () => {
  const Constructor = Vue.extend(PaperInfoBox)
  const vm = new Constructor().$mount()
  expect(vm.$el.textContent).to.contain('David E. GoldbergJohn H. Holland'); 
});


it('should render year of the paper as 1988', () => {
  const Constructor = Vue.extend(PaperInfoBox)
  const vm = new Constructor().$mount()
  expect(vm.$el.textContent).to.contain('1988'); 
});

it('should render paper name as Machine Learning for High-Speed Corner Detection', () => {
  const Constructor = Vue.extend(PaperInfoBox)
  const vm = new Constructor().$mount()
  expect(vm.$el.textContent).to.contain('Machine Learning for High-Speed Corner Detection'); 
});

it('should render authors name as Edward RostenTom Drummond', () => {
  const Constructor = Vue.extend(PaperInfoBox)
  const vm = new Constructor().$mount()
  expect(vm.$el.textContent).to.contain('Edward RostenTom Drummond'); 
});

it('should render year of the paper as 2006', () => {
  const Constructor = Vue.extend(PaperInfoBox)
  const vm = new Constructor().$mount()
  expect(vm.$el.textContent).to.contain('2006'); 
});

it('should render paper name as Analysis of gray level corner detection', () => {
  const Constructor = Vue.extend(PaperInfoBox)
  const vm = new Constructor().$mount()
  expect(vm.$el.textContent).to.contain('Analysis of gray level corner detection'); 
});

it('should render authors name as Khwang Teoh', () => {
  const Constructor = Vue.extend(PaperInfoBox)
  const vm = new Constructor().$mount()
  expect(vm.$el.textContent).to.contain('Khwang Teoh'); 
});

it('should render year of the paper as 1999', () => {
  const Constructor = Vue.extend(PaperInfoBox)
  const vm = new Constructor().$mount()
  expect(vm.$el.textContent).to.contain('1999'); 
});

  
})
