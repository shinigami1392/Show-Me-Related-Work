import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        userObjStore:{
            given_name:'',
            family_name:'',
            email:'',
            userid:'',
            picture:'',
            authorized: false 
        },
        domains:{}
    },
    mutations:{
        setAuthorization(state, payload){
            state.userObjStore.given_name  = payload.given_name
            state.userObjStore.family_name  = payload.family_name
            state.userObjStore.email  = payload.email
            state.userObjStore.userid  = payload.userid
            state.userObjStore.picture  = payload.picture
            state.userObjStore.authorized  = payload.authorized
        },
        setDomains(state, value){
            state.domains = value;
        }
    }
});