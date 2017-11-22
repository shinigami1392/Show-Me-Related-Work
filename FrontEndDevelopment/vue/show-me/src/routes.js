import PapersTable from './components/PapersTable.vue'
import PaperInfoBox from './components/PaperInfoBox.vue'
import ListBox from './components/ListBox.vue'
import NavigationBar from './components/NavigationBar.vue'

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
