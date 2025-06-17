<script>
import { groupId, userName } from './stores/state';

import { useLockStore1,useLockStore2 } from './stores/lock';
import {useRouteState} from './stores/routeState'

import { ref } from 'vue';
import { VAceEditor } from 'vue3-ace-editor';
import 'ace-builds/src-noconflict/mode-python'; // Load the language definition file used below
import 'ace-builds/src-noconflict/theme-chrome'; // Load the theme definition file used below
import { problems } from './problem/problem';
// import { } from 'vue-router'

import {goCelebrate} from './lib/goCelebrate'


// const content = ref(JSON.stringify({ message: 'Hello Ace' }));
export default {
  name: 'HomeView',
  components: {
    VAceEditor
  },
  data() {
    return {
      content: "for i in range(0,100):\n\tprint(i)",
      output: [],
      animationDuration: 150, //ms
      animation: true,
      attemps: 0,
      group_id: groupId(),
      user_name: userName(),
      // disableRun: false,
      running:false, //代码是否正在运行
      pageName:'',
      rightEdCodes: []
    }
  },
  computed: {
    problem() {
      return problems[this.group_id.groupId - 1]
    },
    lockState() {
      // console.log(this.$route.path)
      if( this.$route.path == '/game/1')
        return useLockStore1();
      else
        return useLockStore2();
    },
    codeLen() {
      return this.problem.wheels
    },
    rightCode() {
      return this.problem.checkCode(this.lockState.currentCode)
    }
  },
  methods: {
    // goCelebrate,
    toggleRun(){
      if( this.running) {
        this.running = false
      }
      else {
        this.running = true;
        this.runCode()
      }
    },
    async runCode() {
      // this.setLockCode("8127");
      this.output = [] //清空
      this.rightEdCodes = [] //清空
      this.attemps = 0
      this.lockState.setCode( this.content) //设置代码
      this.lockState.setAttemps(0) //清零
      this.lockState.clearValidCodes() //清空


      window.pyodide.setStdout({
        batched: (str) => {
          this.output.push(str)
        }
      })

      // 调用count_executed_lines
      // 关键步骤：将 JavaScript 变量注入 Python 环境
      // pyodide.globals.set("code", this.content);
      const globals = pyodide.toPy({ code: this.content });
      let __result = await window.pyodide.runPythonAsync(`
        import sys
        def count_executed_lines(code_str):
            line_counts = {}
            original_trace = sys.gettrace()

            def trace_function(frame, event, arg):
                if event == 'line':
                    lineno = frame.f_lineno
                    line_counts[lineno] = line_counts.get(lineno, 0) + 1
                return trace_function

            try:
                sys.settrace(trace_function)
                exec(code_str, {})
            finally:
                sys.settrace(original_trace)
            return sum(line_counts.values())
        count_executed_lines(code)`, { globals })
      // this
      this.lockState.setCodeRunLineTotSum(__result)

      // alert(__result)
      // this.code_run_line_count_sum = __result;
      // this.code_run_line_count_sum = 0;


      this.output = [] //清空
      window.pyodide.runPython(this.content)
      //检查output 里面的code的格式
      // 1. 是否长度不超过codeLen
      for(let code of this.output) {
        let t = this.number_to_string(code)
        if(t.length > this.codeLen) {
          // alert("你的代码输出的密码长度超过限制长度: "+ this.codeLen)
          this.$swal.fire({
            icon:"error",
            text:"你的代码输出的密码长度超过限制长度: "+ this.codeLen,
          })
          return;
        }
      }

      this.lockState.set_tot_attemps(this.output.length)
      this.setLockLoop()
    },
    number_to_string(code) {
      if (typeof code === "number") {
        code = String(code);
      }
      if (code.length < this.codeLen) {
        code = Array(this.codeLen - code.length).fill("0").join("") + code
      }
      return code
    },
    setLockCode(code) {
      // this.attemps += 1;
      code = this.number_to_string(code);

      this.lockState.increaseAttemps();
      // 按百分比设置 _code_run_line_tot_sum
      this.lockState.setCurrentCode(code);
      if(this.problem.checkCode(code)) {
        this.lockState.pushValidCodes(code);
        goCelebrate()
      }
      // console.log(code)

      this.lock.setCode(code, this.animation);
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async setLockCodeWithDelay(code, delay) {
      this.setLockCode(code);
      await this.sleep(delay);
    },
    async setLockLoop() {
      // this.disableRun = true // 禁用按钮
      for (let code of this.output) {
        if (this.running == false) {
          break;
        }
        await this.setLockCodeWithDelay(code, this.animationDuration);
      }
      this.running = false
      // this.disableRun = false
    },
    updateComponent( path = '/game/1') {
      console.log("update this component state at route : ",this.$route.path)
      // 1. 得到当前的组
      let gid = this.group_id.groupId
      // let ans = this.lockState.answer
      let lockState = path == '/game/1' ? useLockStore1() : useLockStore2()
      if( this.lock == undefined)
        this.lock = new Lock({ id: "mylock", wheels: this.problem.wheels, timeout: 1 })
      else { //设置当前的lock
        //这个anwser 不是答案，代表是的当前的lock的数值
        console.log(path,'lockState.currentCode',lockState.currentCode)
        this.lock.setCode(lockState.currentCode, false)
      }
    }
  },
  mounted() {
    // this.updateComponent()
    // console.log(this.$refs)
    this.$refs.aceRef.getAceInstance().setOptions({
      fontSize: "20pt"
    });
  },
  beforeRouteEnter(to,from,next) {
    next(vm=>{
      console.log("beforeRouteEnter")
      vm.updateComponent(to.fullPath)
    })
  },
  beforeRouteUpdate(to,from) {
    console.log("beforeRouteUpdate")
    // console.log("to",to.)
    this.updateComponent(to.fullPath)
    // next();
  },
  // afterRouteEnter() {
  //   console.log("afterRouteEnter")
  //   // this.updateComponent()
  // }
}
</script>
<template>
  <div class="game1 row">

    <div class="col" style="">
      <div class="card" style="width: 540px; height:100%;">
        <div class="card-body" style="">
          <div class="d-flex border-1 border-bottom justify-content-between">
            <h4 class="card-title ">{{ problem.title }}</h4>
            <button class="btn btn-sm btn-outline-info" data-bs-toggle="modal" data-bs-target="#introduction">说明书</button>
          </div>
          <div class="card-text">
            <div v-html="problem.content"></div>
          </div>
        </div>
      </div> <!-- end card -->

    </div> <!-- end col1-->

    <!-- model  说明书-->
     <div
      class="modal fade"
      id="introduction"
      aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel"
      tabindex="-1"
     >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalToggleLabel">
              说明书
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <ul>
              <li><code>print(123)</code>输出的数字会改变密码锁的值为123</li>
              <li>如果密码锁的值被改变成正确的值，会有提示</li>
            </ul>
          </div>
        </div>
      </div>
     </div>
    <!-- model end -->




    <div class="col ">

      <div class="card" style="width: 540px;">
        <div class="card-body">
          <h4 class="card-title border-1 border-bottom">密码锁

            <span style="font-size: small;"> 组:{{ group_id.groupId }} - {{ user_name.userName }} </span>

          </h4>
          <div class="lock-container">
            <div id="mylock" style="--rotationSpeed: 0.1s;"></div>
            <pre class="lock-info">
print次数 : {{ lockState.attemps }}
密码长度 : {{ lockState.wheels }}
当前数值 : {{  lockState.currentCode  }}
是否正确 : {{ rightCode }}
执行次数 : <span style="color:red" class="hacker-text">{{ lockState.code_run_line_current_cnt }}</span>
</pre>

            <pre class="lock-info">
满足条件的值: {{ lockState.validCodes.join(",")}}
</pre>
          </div>
          <h4 class="card-title border-1 border-bottom mt-4">代码
            <button @click="toggleRun" style="--bs-btn-disabled-bg:#222;--bs-btn-disabled-color:#ccc;"
              class="btn btn-sm" :class="{ 'btn-outline-primary': !running, 'btn-info': running}"> {{ running ? "Stop Run" : "Run Code" }}</button>
          </h4>
          <v-ace-editor v-model:value="content" ref="aceRef" lang="python" theme="chrome" style="height: 300px" />
        </div>

        <div>
          <!-- {{ output }} -->
        </div>
      </div>
    </div> <!-- end col2-->
  </div>
</template>

<style>
@import url("./assets/lock.css");
@import url("./assets/game1_hack_style.css");

.wheel__segment{
  text-align: center;
}

.lock {
	--rotationSpeed: .1s !important;
}

.lock-container {
  background-color: #222222;
  display: flex;
  justify-content: center;
  padding: 20px;
  flex-direction: column;
}
#mylock {
  display: flex;
  justify-content: center;
}
.game1 {
  /* text-align: center; */
}

.lock-info {
  max-height: 200px;
  overflow: auto;
  background: #000;
  color: #0F0;
  padding: 10px;
}

</style>