<template>
    <div>
        <mylock :wheels="3" :code="lock_code"></mylock>
        <ace @update:output="getPythonOutput" :code="code" :height="'120px'" :isRunning="isRunning"></ace>
        <myoutput :output="content" :maxHeight="'100px'"></myoutput>
    </div>
</template>

<script>
import  ace  from './sub_componets/ace.vue';
import { goCelebrate } from './goCelebrate';
import myoutput from './sub_componets/output.vue';
import game_code from './game2_code_template.txt?raw'
import mylock from './lock.vue'

export default {
    components: {
        ace,myoutput,mylock
    },
    data() {
        return {
            content:'',
            isRunning:false,
            code:game_code,
            lock_code:'000',
        }
    },
    methods: {
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        async getPythonOutput(content) {
            this.isRunning = true;
            console.log("getPythonOutput", content);
            this.content = '';
            let outputs = content.split(' ');
            for(let o of outputs) {
                // console.log(o);
                this.lock_code = o + ''
                if( this.lock_code == '407') {
                    goCelebrate();
                }
                await this.sleep(20)
                this.content += (o + ' ');
            }
            this.isRunning = false;
            // return this.content;
        }
    }
}

</script>

<style scoped>

</style>