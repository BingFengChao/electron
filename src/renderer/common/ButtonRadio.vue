<template>
    <!-- 按钮式单选 -->
    <ul class="button-radio nowrap hidden scroll-x flex-s0" :class="center ? 'tc' : 'iblock'">
        <li
            class="br16 cp iblock"
            :class="[size, value === (isObject ? item[valueKey] : index) ? `c-white bg-${type}` : 'bg-primary-disabled']"
            v-for="(item, index) in list"
            :key="isObject ? item[valueKey] : index"
            @click="$emit('change', isObject ? item[valueKey] : index)"
        >{{ isObject ? item[labelKey] : item }}</li>
    </ul>
</template>

<script>
import { isObject } from '@/assets/utils/types.js'
export default {
  model: { prop: 'value', event: 'change' },
  props: {
    list: { type: Array, default: () => [] }, // 列表
    value: {}, // 当前值
    labelKey: { type: String, default: 'label' }, // label 属性
    valueKey: { type: String, default: 'value' }, // value 属性
    size: { type: String, default: 'default' }, // 按钮大小，可使用 default small
    type: { type: String, default: 'primary' }, // 按钮风格类型，可使用 primary success warnin danger pink info
    center: { type: Boolean, default: false } // 是否占满整行居中
  },
  data () {
    return {
      isObject: this.list.every(item => isObject(item))
    }
  }
}
</script>

<style lang="less" scoped>
.button-radio {
    li {
        padding: 0 20px;
        line-height: 32px;
        & + li {
            margin-left: 10px;
        }
        &.default {
            padding: 0 25px;
            line-height: 40px;
            font-size: 20px;
            border-radius: 20px;
        }
    }
}
</style>
