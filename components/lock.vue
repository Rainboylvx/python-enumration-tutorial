<template>
    <div class="lock-container">
        <div id="mylock" style="--rotationSpeed: 0.1s;"></div>
    </div>
</template>

<script>
import Lock from './lock.js'
export default {
    props: {
        wheels: {
            type: Number,
            default: 3
        },
        code: {
            type: String,
            default: '000'
        },
        animation : {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            message: 'Hello World123',
            lock:null,
        }
    },
    watch: {
        code: function (newVal, oldVal) {
            // console.log("code changed", newVal)
            this.setLockCode(newVal)
        }
    },
    mounted() {
        this.lock = new Lock({ id: "mylock", wheels: this.wheels, timeout: 1 })
        this.setLockCode(this.code)
    },
    methods: {
        updateComponent() {
            console.log("update this component state ")
            // 1. 得到当前的组
            let gid = this.group_id.groupId
            // let ans = this.lockState.answer
            this.lock = new Lock({ id: "mylock", wheels: this.wheels, timeout: 1 })
        },
        number_to_string(code) {
            if (typeof code === "number") {
                code = String(code);
            }
            if (code.length < this.wheels) {
                code = Array(this.wheels- code.length).fill("0").join("") + code
            }
            return code
        },
        setLockCode(code) {
            // this.attemps += 1;
            code = this.number_to_string(code);

            // this.lockState.increaseAttemps();
            // 按百分比设置 _code_run_line_tot_sum
            // this.lockState.setCurrentCode(code);
            // if (this.problem.checkCode(code)) {
            //     this.lockState.pushValidCodes(code);
            //     goCelebrate()
            // }
            // console.log(code)

            // this.lock.setCode(code, this.animation);
            this.lock.setCode(code, this.animation);
        },
    }
}
</script>

<style>
@import './lock.css';

.lock-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

#mylock {
    display: flex;
    justify-content: center;
}

.wheel__segment span {
    text-align: center;
}
</style>