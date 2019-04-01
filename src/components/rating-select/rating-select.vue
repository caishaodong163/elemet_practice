<template>

  <div class="rating-select">
    <div class="rating-type border-bottom-1px">
        <!-- 公共组件评价 -->
      <span @click="select(2)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span
        class="count">{{ratings.length}}</span></span>

      <span @click="select(0)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span
        class="count">{{positives.length}}</span></span>

      <span @click="select(1)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span
        class="count">{{negatives.length}}</span></span>

    </div>
    <div  @click="toggle"  class="switch" :class="{'on':onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
const EVENT_SELECT = 'select'
const EVENT_TOGGLE = 'toggle'

export default {
    props:{
        ratings:{ //全部的数据
            type:Array,
            default() {
                return []
            }
        },
        selectType:{ //进来的时候默认看所有的
            type:Number,
            default:ALL
        },
        onlyContent:{//查看有内容的评价  默认false(查看全部有内容武内容都看)
            type:Boolean,
            default:false
        },
        desc:{
            type:Object,
            default() { //商品详情的
                return {
                    all:'全部',
                    positive:'滿意',
                    negative:'不滿意'
                }
            }
        }
    },
    computed:{
        positives() {
            // 評價字段--正
            return this.ratings.filter((rating) => {
                return rating.rateType == POSITIVE
            })
        },
        negatives() {
            // 評價字段--負
            return this.ratings.filter((rating) => {
                return rating.rateType == NEGATIVE
            })
        }
    },
    methods:{
        select(type) { //子组件不能修改父级传过来的props，需要派发给父级
            this.$emit(EVENT_SELECT,type)
        },
        toggle() {
            this.$emit(EVENT_TOGGLE)
        }
    }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .rating-select
    .rating-type
      padding: 18px 0
      margin: 0 18px
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        font-size: $fontsize-small
        color: $color-grey
        &.active
          color: $color-white
        .count
          margin-left: 2px
        &.positive
          background: $color-light-blue
          &.active
            background: $color-blue
        &.negative
          background: $color-light-grey-s
          &.active
            background: $color-grey
    .switch
      display: flex
      align-items: center
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid $color-row-line
      color: $color-light-grey
      &.on
        .icon-check_circle
          color: $color-green
      .icon-check_circle
        margin-right: 4px
        font-size: $fontsize-large-xxx
      .text
        font-size: $fontsize-small
</style>
