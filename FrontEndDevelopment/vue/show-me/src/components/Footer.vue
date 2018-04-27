<template>
    <div class="footerheader">
    <div id="footerSection">
        <div style="float:left;color:white; padding-top:15px; padding-left :20px;">
            <i class="far fa-copyright"></i><span style="font-family: Arial;"> ShowMe Related Work 2018</span>
        </div>
        <div style="float:right;color:white; padding-top:15px; padding-left :20px;" class="link-icons">
            <router-link :to="{ name:'aboutus'}" style="color:#fff">About Us</router-link>&ensp;
            <router-link :to="{ name:'contactus'}" style="color:#fff">Contact Us</router-link>&ensp;
            <span style="color:#FFC627; margin-right:10px">Made with ❤ at ASU</span>
        </div>
    </div>
    </div>
</template>


<script>
export default {
  
}
</script>


<style>
    .footer {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        padding: 1rem;
        background: -webkit-radial-gradient(circle, #fff, #fff);
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .footerheader {
        position: fixed;
        left: 0;
        bottom: 0;
        border-radius: 0px;
        width: 100%;
        height: 50px;
        background-color: #35342f;
    }

    .footerSection {
        width: 100%;
        float: right;
        text-align: left;
    }

</style>