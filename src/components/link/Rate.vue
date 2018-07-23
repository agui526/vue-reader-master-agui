<template>
    <div class="rate-score">
        <span class="star-item" :class="item" v-for="(item, index) in itemClasses" :key="index">
        </span>
         {{ score }}
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {}
    },
    props: ['score'],
    computed: {
        itemClasses() {
            let result = []
            let score = Math.floor(this.score * 2) / 2
            let hasDecimal = score % 1 !== 0
            let stars = Math.floor(score)
            for(let i = 0; i < stars; i++) {
                result.push('on')
            }
            if(hasDecimal) {
                result.push('half')
            }
            while(result.length < 5) {
                result.push('off')
            }
            return result
        }
    }
}
</script>

<style lang="less" type="text/less" scoped>
    .rate-score {
        display: flex;
        align-items: center;
        .star-item {
            display: inline-block;
            width: 20px;
            height: 20px;
            background-size: 100% 100%;
            &.on {
                background: url(../../assets/images/star_on.png)
            }
            &.half {
                background: url("../../assets/images/star_half.png");
            }
            &.off {
                background: url("../../assets/images/star_off.png");
            }
            &:last-of-type {
                margin-right:10px;
            }
        }
    }
</style>

