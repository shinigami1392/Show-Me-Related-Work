<template>
    <app-box v-bind:boxHeaderProp = "feedbackBoxHeader">
        <div id = "details">
        </div>
    </app-box>    
</template>

<script>
export default {
    data() {
        return {
            feedbackBoxHeader: "Feedback"
        }
    }
}            
</script>

<style>
</style>