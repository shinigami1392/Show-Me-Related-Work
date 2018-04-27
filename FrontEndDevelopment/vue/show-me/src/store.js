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
        domains:{},
        voting:{
            weight:0,
            upvotesCount:0,
            downvotesCount:0   
        },
        IP_Config :'http://54.201.123.246:8081',
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
        },
        setVoting(state, payload){
            state.voting.weight = payload.weight
            state.voting.upvotesCount = payload.upvotesCount
            state.voting.downvotesCount = payload.downvotesCount
        }
    }
});