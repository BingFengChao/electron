<template>
    <div>
        <button-radio v-model="type" :list="typeList"></button-radio>
        <second-timer v-show="!type"></second-timer>
        <count-down v-show="type"></count-down>
    </div>
</template>

<script>
export default {
  components: {
    ButtonRadio: () => import('@/common/ButtonRadio'),
    SecondTimer: () => import('./components/SecondTimer'),
    CountDown: () => import('./components/CountDown')
  },
  data () {
    return {
      type: 0, // 类型
      typeList: ['秒表', '倒计时'] // 类型列表
    }
  },
  provide: {
    add0: n => n > 9 ? n : '0' + n
  }
}
</script>

<style lang="less" scoped>
/deep/ .time {
    border-top: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    margin: 50px 0;
    padding: 40px 30px;
    .item {
        display: inline-block;
        min-width: 200px;
        text-align: center;
    }
    .item, .value {
        font-size: 150px;
        line-height: 120px;
        margin: 10px 0;
    }
    .item + .item, .colon {
        position: relative;
        &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 20px;
            height: 20px;
            border-radius: 50%;
            box-shadow: 0 -20px 0 #606266, 0 20px 0 #606266;
        }
    }
}
</style>
