<template>
    <div class="footerheader">
    <div id="footerSection">
        <div style="float: left;color:white; padding-top:15px; padding-left :40px;">
            <i class="far fa-copyright"></i><span style="font-family: Arial;"> ShowMe Related Work 2018</span>
        </div>
        <div style="float: right;color:white; padding-top:15px; padding-left :40px;" class="link-icons">
            <router-link :to="{ name:'aboutus'}" style="color:#fff">About Us</router-link>
            <router-link :to="{ name:'contactus'}" style="color:#fff">Contact Us</router-link>
            <span style="font-family: Arial; color:#FFC627;">Made with</span>
            <span style="font-family: Arial; color:#a32049; font-size: 16px;">❤</span>
            <span style="font-family: Arial; color:#FFC627;">at ASU</span>
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
        padding-left: 3%;
        float: right;
        text-align: left;
    }

    .link-icons {
        padding-top: 20px;
        padding-bottom: 10px;
        color: white !important;
        float: right;
        width: 25%;
    }

    .link-icons a {
        color: white;
        text-decoration: none;
        padding-right: 20px;
    }

</style>