<template>

  <span class="text">HEllo world</span>

</template>

<style scoped>
.text {
    content: 'hello';
}
span {
    background: sugar.color(accent);
}
</style>

<script>
export default {
    something() {
        console.log('Hello')
    }    
};
</script>
