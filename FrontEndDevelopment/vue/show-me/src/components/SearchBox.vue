<template>
        <div class="input-group" style="margin-right:20%; margin-left:60%; width:60%; margin-bottom:2%">
             <input type="search" class="form-control" v-model="search_text" name="q" id="location" value="" maxlength="128" placeholder="Search Place..." autocomplete="off" />
             <div class="input-group-addon searchbox" v-on:click="search"><i class="fa fa-search"></i></div>
            </div>
          </div>
     
</template>


<script>
  export default {
      data () {
        return {
          search_text:""
        }
      },
      methods: {
            search: function(){
                this.$router.push({ path: '/search', query: { q: this.search_text}});
            }
      }
  };
</script>


<style>
.searchbox{
  cursor: pointer;
}
</style>
