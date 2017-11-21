import PapersTable from './components/PapersTable.vue'
import PaperInfoBox from './components/PaperInfoBox.vue'

export const routes = [
    {   path:'/areas/:areaid',
        name: 'allPapers',
        components: {
            'table-box': PapersTable
        },
    },
    {   path:'/areas/:areaid/paper/:paperid',
                components: {
                    'table-box': PapersTable,
                    'info-box':PaperInfoBox
                }, 
                name:'paperInfo'
    }


    
    ];