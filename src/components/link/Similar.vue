<template>
    <div class="similar" @click="toBookDetail(bookDetail.id)">
        <div class="similar-img">
            <img :src="bookDetail.images" alt="" @error="loadImage($event)">
        </div>
        <p>{{ bookDetail.name }}</p>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            bookDetail: {}
        }
    },
    props: {
        like: {
            type: String,
            required: true
        }
    },
    created() {
        this.getBookDetail(this.like)
    },
    methods: {
        getBookDetail(id) {
            axios.get(`${this.common.api}/booklist?id=${id}`).then(res => {
                this.bookDetail = res.data
            })
        },
        loadImage(e) {
            this.common.defaultImage(e)
        },
        toBookDetail(id) {
            //this.$router.push({path: '/bookdetail/' + id})
            let routeData = this.$router.resolve({ path: '/bookdetail/' + id });
            window.open(routeData.href, '_blank');
            document.body.scrollTop = 0
        }
    },
    watch: {
        like(val, old) {
            this.getBookDetail(val)
        }
    }
}
</script>

<style lang="less" scoped>
  .similar {
    width: 110px;
    height: 165px;
    .similar-img {
      height: 140px;
    }
    img {
      width: 100%;
      height: 100%;
      &[src=""] {
        opacity: 0;
      }
    }
  }
</style>


