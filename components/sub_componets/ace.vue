<template>
    <div>
        <v-ace-editor ref="aceRef" :value="code" lang="python" theme="chrome" :style="{height:height}" />
        <button class="run-btn" @click="runCode" :disabled="isRunning">运行</button>
    </div>
</template>

<script>
import { VAceEditor } from 'vue3-ace-editor';
import 'ace-builds/src-noconflict/mode-python'; // Load the language definition file used below
import 'ace-builds/src-noconflict/theme-chrome'; // Load the theme definition file used below

export default {
    name: 'AceEditor',
    components: {
        VAceEditor
    },
    props: {
        height: {
            type: String,
            default: '50px'
        },
        with: {
            type: String,
            default: '100%'
        },
        code: {
            type: String,
            default: "print('Hello World')",
        },
        isRunning: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            output:[],
        }
    },
    methods: {
        async runCode() {
            console.log("isRunning", this.isRunning);
            if( this.isRunning) {
                return;
            }
            this.output = [];
            window.pyodide.setStdout({ batched: (msg) => { this.output.push(msg) } });
            try {
                let mycode = this.$refs.aceRef.getAceInstance().getValue();
                await window.pyodide.runPythonAsync(mycode); // 运行编辑器中的代码
            }
            catch (e) {
                this.output.push(e.message);
            }
            // console.log(this.output);
            this.$emit('update:output', this.output.join(' '));
        }
    }
}

</script>

<style scoped>
.run-btn {
    font-size: 0.8rem;
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.run-btn:hover {
    background-color: #45a049;
}

.run-btn:active {
    background-color: #3e8e41;
    box-shadow: 0 2px #666;
    transform: translateY(1px);
}

.run-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>