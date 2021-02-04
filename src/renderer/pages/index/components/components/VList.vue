<template>
    <ul class="v-list">
        <li
            class="flex flex-x-sb flex-y-c cp"
            v-for="(item, index) in list"
            :key="index"
            @click="$emit('click', item, index)"
        >
            <slot v-bind:item="item"></slot>
        </li>
    </ul>
</template>

<script>
export default {
  props: {
    list: { type: Array, default: () => [] }
  }
}
</script>

<style lang="less" scoped>
li {
    height: 52px;
    padding: 0 30px;
    transition-duration: 0.1s;
    &:hover {
        background-color: rgba(#000, 0.05);
    }
    & + li {
        border-top: 1px solid #DCDFE6;
    }
}
</style>
