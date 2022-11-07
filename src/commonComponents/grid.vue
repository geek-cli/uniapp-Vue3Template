<template>
    <view class="grid" :style="{
        gridTemplateColumns: `repeat(${num}, 1fr)`,
        gap: gap
    }">
        <slot></slot>
    </view>
</template>

<script setup>
    // vue
    import { ref, reactive, inject, toRefs } from "vue";
    // 路由
    import { useRouter, useRoute } from "vue-router";
    const router = useRouter(); // 对路由进行操作时使用
    const route = useRoute(); // 获取当前路由的相关信息
    // 获取全局对象
    const global = inject("global");
    // 解构需要使用的部分
    const { $Common, $toast } = global;

    // props
    let props = defineProps({
        // 一行显示几个
        num: {
            default: 3,
            type: Number
        },
        // 每个项目之间的距离
        gap: {
            default: "30rpx",
            type: String
        }
    })
</script>

<style lang="less" scoped>
    .grid {
        display: grid;
    }
</style>
