// 把公共的一样 的业务逻辑放在这里面
const ALL = 2

export default {
  data() {
    return {
      selectType: ALL,
      onlyContent: true
    }
  },
  computed: {
    computedRatings() {
      let ret = [];
      this.ratings.forEach(rating => {
        if (this.onlyContent && !rating.text) {
          return
        }
        if (this.selectType === ALL || this.selectType === rating.ratetype) {
          ret.push(rating)
        }
      });
      return ret;
    }
  },
  methods: {
    onSelect(type) {
      this.selectType = type
    },
    onToggle() { //取反
      this.onlyContent = !this.onlyContent
    }
  },
}
