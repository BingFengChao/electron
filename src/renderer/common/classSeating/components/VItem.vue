<template>
    <div
        class="v-item w100p iblock"
        :class="[item ? ($parent.isChecked || $parent.isHover ? 'cp' : '') : 'empty', { active }]"
        @click="item && $emit('click')"
    >
        <div class="body h100p flex flex-y-c" :class="{ 'bg-primary c-white': active }">
            <v-img class="h100p img" :src="item.src" user mini v-if="item"></v-img>
            <div class="h100p img placeholder" v-else></div>
            <span class="ellipsis flex-g1">{{ item ? item.Name : '空 座' }}</span>
            <slot v-bind:item="item" v-if="item"></slot>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    item: { type: Object, default: () => ({}) },
    active: { type: Boolean, default: false }
  }
}
</script>

<style lang="less" scoped>
.v-item {
    height: 70px;
    border: 2px solid #e8e9ea;
    padding: 8px;
    border-radius: 35px;
    vertical-align: top;
    position: relative;
    &.active, &.cp:hover {
        border-color: @color-primary;
    }
    &.empty {
        border-style: dashed;
        .img.placeholder {
            background-color: #c7c7c7;
        }
    }
    .body {
        border-radius: 25px;
        background-color: #e8e9ea;
        .img {
            width: 50px;
            border-radius: 25px;
            margin-right: 10px;
        }
    }
}
</style>
