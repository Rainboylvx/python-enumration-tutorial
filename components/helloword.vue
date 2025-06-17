<template>
    <div>
        <ace @update:output="content=$event" :code="code"></ace>
        <myoutput :output="content" :maxHeight="'100px'"></myoutput>
    </div>
</template>

<script>
import  ace  from './sub_componets/ace.vue';
import myoutput from './sub_componets/output.vue';
export default {
    components: {
        ace,myoutput
    },
    data() {
        return {
            content:'',
            code:'print("Hello, World!")',
            message: 'Hello World123'
        }
    }

}
</script>

<style lang="scss" scoped>

</style>