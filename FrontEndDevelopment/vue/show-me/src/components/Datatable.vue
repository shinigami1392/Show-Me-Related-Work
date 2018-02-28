<template>
    <table id ='dtable'>
        <thead>
            <tr>
                <th v-for="column in columns">{{column}}</th>
            </tr>     
        </thead>
        <tbody>
            <tr>
                <td>Multimedia Web Databases</td>
                <td>Selcuk Candan</td>
            </tr>
            <tr>
                <td>Aritificial Intelligence</td>
                <td>Khambapatti</td>    
            </tr>    
            
        </tbody>    

    </table>
</template>

<script>
    export default {
        data() {
            return {
                /*columns: [],
                data: Array,
                url: String */
            };
        },
        mounted(){
           $('#dtable').DataTable();
           // $(this.$el).DataTable();
        },
         props: {
            columns: Array
         }
    }
</script>


<style>


</style>