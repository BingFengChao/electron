<template>
    <div class="class-info c-white br16 hidden">
        <div class="head flex flex-x-sb flex-y-c">
            <span class="date">{{ getDate({ format: 'yyyy-MM-dd' }) }}</span>
            <span class="week">第{{ week }}周 星期{{ getDate({ format: 'DD' }) }}</span>
        </div>
        <div class="body flex flex-column flex-x-sb">
            <h1>{{ '一年级一班' }}</h1>
            <div class="info flex">
                <div class="name flex-g1">
                    <i class="iconfont">&#xe009;</i>
                    {{ '刘老师' }}
                </div>
                <div class="student flex-g1">
                    <i class="iconfont">&#xe00a;</i>
                    {{ 52 }}人
                </div>
            </div>
            <div class="flex flex-x-c" v-if="!$store.state.userInfo">
                <el-button size="small" type="warning" round @click="login">未登录，请登录</el-button>
            </div>
            <div class="flex flex-x-sb flex-y-c user" v-else>
                <div>
                    <v-img class="avatar" :src="$store.state.userInfo.avatar" user mini></v-img>
                    <span class="name">{{ $store.state.userInfo.name }}登录中</span>
                </div>
                <el-link type="danger" class="loginout iconfont cp" @click="loginout">&#xe00b;</el-link>
            </div>
        </div>
    </div>
</template>

<script>
import { getDate } from '@/assets/utils/date.js'
export default {
  data () {
    return {
      getDate,
      week: 28, // 第几周
      user: null // 用户信息
    }
  },
  created () {

  },
  methods: {
    // 登录
    login () {
      this.$store.commit('saveUserInfo', { avatar: '', name: '刘老师', id: '123' })
    },
    // 退出
    loginout () {
      this.$store.commit('saveUserInfo', null)
    }
  }
}
</script>

<style lang="less" scoped>
.class-info {
    line-height: 1;
    .head {
        height: 40px;
        padding: 0 30px;
        background-image: linear-gradient(136deg, #0089FD 0%, #47BBEF 100%);
    }
    .body {
        height: calc(~"100% - 40px");
        background: url("@{domain}/bg-index.png") no-repeat center / 100% 100%;
        padding: 10px 30px;
        h1 {
            font-size: 32px;
            font-weight: bold;
        }
        .info {
            font-size: 20px;
            i {
                font-size: 24px;
            }
        }
        .user {
            .avatar {
                width: 32px;
                height: 32px;
            }
            .name {
                font-size: 20px;
                margin-left: 15px;
                line-height: 32px;
            }
            .loginout {
                font-size: 24px;
                padding: 4px;
            }
        }
    }
}
</style>
