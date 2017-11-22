
import ListBox from './components/ListBox.vue'
import NavigationBar from './components/NavigationBar.vue'

const PapersTable = resolve =>{
    require.ensure(['./components/PapersTable.vue'],()=>{
        resolve(require('./components/PapersTable.vue'));
    });  
};
const PaperInfoBox = resolve =>{
    require.ensure(['./components/PaperInfoBox.vue'],()=>{
        resolve(require('./components/PaperInfoBox.vue'));
    });  
};



export const routes = [
    {
        path: '/',
        name: 'home',
        components:{
            default: NavigationBar,
            'area-box':ListBox
        }    
    },
    {
    path: '/areas/:areaid',
    name: 'allPapers',
    components: {
      'area-box':ListBox,
      'table-box': PapersTable
    },
  },
  {
    path: '/areas/:areaid/paper/:paperid',
    components: {
      'area-box':ListBox,
      'table-box': PapersTable,
      'info-box': PaperInfoBox
    },
    name: 'paperInfo'
  },
  {
      path: '*',
      redirect: { name: 'home'}
  }
 

];
