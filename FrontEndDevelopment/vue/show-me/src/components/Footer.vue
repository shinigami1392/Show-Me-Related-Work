<template>
    <div class="footerheader">
    <div id="footerSection">
        <div style="float: left;color:white; padding-top:15px; padding-left :40px;">
            <i class="far fa-copyright"></i><span style="font-family: Arial;"> ShowMe-Related Research Work, 2018</span>
        </div>
        <div class="link-icons" style="color:#fff">
            <router-link :to="{ name:'aboutus'}">About Us</router-link>
            <router-link :to="{ name:'contactus'}">Contact Us</router-link>
            <a href="#" target="_blank">
                <i class="fab fa-facebook-f fa-lg"></i>
            </a>
            <a href="#" target="_blank">
                <i class="fas fa-envelope fa-lg"></i>
            </a>
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
        background: -webkit-radial-gradient(circle, #fff, #fff);
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .footerheader {
        position: fixed;
        left: 0;
        bottom: 0;
        border-radius: 3px;
        width: 100%;
        height: 50px;
        background-color: #000;
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