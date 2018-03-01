import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        registrations:[],
        users:[
            {id:1, name:'Dummy1',registered:true},
            {id:2, name:'Dummy2',registered:true},
            {id:3, name:'Dummy3',registered:true},
            {id:4, name:'Dummy4',registered:true},
        ],
        comments:[
            {linkid:1, text:"good relation"},
            {linkid:2, text:"bad relation"},
            {linkid:3, text:"ok relation"}
        ]
    },
    getters:{
        userGetter: state => {
            return state.users;
        },
        commentGetter: state => {
            return state.comments;
        }
    },
    mutations:{

    }
});