<template>
    <div id="custom-search-input">
            <div >                    
                <span class="input-group-btn">
                    <input type="text" class="form-control input-lg" placeholder="What are you looking for..." />
                    <button class="btn btn-info btn-lg fas fa-search" type="button"></button>
                </span>
            </div>
      </div>      
</template>


<script>
  export default {
      data () {
        return {
          
        }
      }
  };
</script>


<style>
#custom-search-input{
    background: -webkit-radial-gradient(circle, #fff, #fff);
    margin-left: 500px;
    margin-right: 500px;
    align-items: center;
    padding: 3px;
    border: solid 2px #0E6390;
    border-radius: 6px;
    background-color: #fff;
    margin-bottom: 5px;
}

#custom-search-input input{
    width:250px;
    border: 0;
    box-shadow: none;
    -webkit-transition: width 0.4s ease-in-out;
    transition: width 0.4s ease-in-out;
}

#custom-search-input button{
    margin: 2px 0 0 0;
    background: none;
    box-shadow: none;
    color: #0E6390;
    padding: 0 8px 0 10px;
    border-left: solid 1px #ccc;    
}

#custom-search-input button:hover{
    border: 0;
    box-shadow: none;
    border-left: solid 1px rgb(204, 204, 204);
}

@media only screen and (max-width: 1350px){
    #custom-search-input input { width: 75%; }
}


@media only screen and (max-width: 1120px){
    #custom-search-input input { width: 0px; }
    #custom-search-input button { visibility: hidden; }
}


</style>
