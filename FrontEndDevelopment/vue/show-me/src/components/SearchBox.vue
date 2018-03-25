<template>


    <div id="custom-search-input">
                <div class="input-group col-md-12">
                    <input type="text" class="form-control input-lg" placeholder="What are you looking for..." />
                    <span class="input-group-btn">
                        <button class="btn btn-info btn-lg" type="button">
                            <i class="fas fa-search"></i>
                        </button>
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
    border: solid 2px #3399FF;
    border-radius: 6px;
    background-color: #fff;

}

#custom-search-input input:focus{
  width: 100%;
}

#custom-search-input input{
    width:500px;
    border: 0;
    box-shadow: none;
    -webkit-transition: width 0.4s ease-in-out;
    transition: width 0.4s ease-in-out;
}

#custom-search-input button{
    margin: 2px 0 0 0;
    background: none;
    box-shadow: none;
    border: 0;
    color: #666666;
    padding: 0 8px 0 10px;
    border-left: solid 1px #ccc;
}

#custom-search-input button:hover{
    border: 0;
    box-shadow: none;
    border-left: solid 1px rgb(204, 204, 204);
}

</style>
