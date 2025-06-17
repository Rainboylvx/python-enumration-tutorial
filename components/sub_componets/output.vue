<template>
    <div class="output-card">
        <div class="title">
            <h6>输出内容:</h6>
        </div>
        <pre :style="{height:height,fontSize:fontSize,'max-height':maxHeight}" style="white-space:  pre-wrap;">{{ output }}</pre>
    </div>
</template>

<script>
export default {
    props: {
        output: {
            type: String,
            default: ''
        },
        height: {
            type: String,
            default: 'auto'
        },
        with: {
            type: String,
            default: '100%'
        },
        fontSize: {
            type: String,
            default: '14px'
        },
        maxHeight: {
            type: String,
            default: '100%'
        }
    }
}
</script>

<style scoped>

.output-card {
    border: 1px solid #ccc;
    padding: 10px;
    margin-top: 10px;
    background-color: #f9f9f9;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.output-card .title {
    font-size: 1.1em;
    font-weight: bold;
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;
}
.output-card pre {
    background-color: #000;
    color: #0F0;
    /* border-radius: 5px; */
    overflow: auto;
    padding: 3px;
    font-family: 'Courier New', Courier, monospace;
}

</style>