<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    created() {
        var endTime = new Date().getTime();
        console.log("created：" + (endTime - window._supremeStartTime));
    },
    mounted() {
        var endTime = new Date().getTime();
        console.log("mounted：" + (endTime - window._supremeStartTime));
    }
};
</script>

<style lang="scss">
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
