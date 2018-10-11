<template>
    <div class="cms-s-header">
        <h1 @click="goback" style="margin-top: 21.440px;margin-bottom: 0;">&nbsp;<</h1>
        <h1 class="page-title">{{title}}</h1>
    </div>
</template>

<script>
export default {
    name: 'nav-bar',
    props: ['title'],
    methods: {
        goback () {
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped>
.cms-s-header{
    background-color: #f7f7f7;
    margin-top: -22px;
}
.page-title{
    margin-top: -45px;
    margin-left: 35%;
    margin-bottom: 0;
}
</style>


