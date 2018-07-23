<template>
  <div class="container">
    <nav class="nav-header">
      <header>
        <a href="/" class="brand"></a>
        <a href="/" class="avatar"></a>
      </header>
      <div class="swipe">
        <mt-swipe :auto="5000">
          <mt-swipe-item><img src="../assets/images/1.jpg" alt=""></mt-swipe-item>
          <mt-swipe-item><img src="../assets/images/2.jpg" alt=""></mt-swipe-item>
          <mt-swipe-item><img src="../assets/images/3.jpg" alt=""></mt-swipe-item>
          <mt-swipe-item><img src="../assets/images/4.jpg" alt=""></mt-swipe-item>
          <mt-swipe-item><img src="../assets/images/5.jpg" alt=""></mt-swipe-item>
        </mt-swipe>
      </div>
    </nav>
    <nav class="home-nav">
      <router-link
        class="guide-nav-div"
        v-for="item in types"
        :key="item.num"
        :to="{path: '/category', query: {type: item.num}}"
      >
        <i class="icon icon-sort"></i>
        <h4 class="guide-nav-h">{{ item.word }}</h4>
      </router-link>
    </nav>
    <loading v-show="loading"></loading>
    <div v-if="!loading">
      <recommend :booklist="bookList | hot" title="热门小说"></recommend>
      <recommend :booklist="bookList | top" title="排行榜"></recommend>
      <recommend :booklist="bookList | free" title="限时免费"></recommend>
      <book-list :booklist="bookList | newbook" title="新书抢鲜"></book-list>
      <book-list :booklist="bookList | endbook" title="畅销完本"></book-list>
      <book-list :booklist="bookList | like" title="猜你喜欢"></book-list>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

import axios from 'axios'
import Loading from './Loading'
import Recommend from './Recommend'
import BookList from './BookList'

export default {

  data() {
    return {
      types: [
        {num: 1, word: '玄幻'},
        {num: 2, word: '修真'},
        {num: 3, word: '都市'},
        {num: 4, word: '历史'},
        {num: 5, word: '游戏'}
      ],
      loading: false,
      bookList: []
    }
  },
  components: {
    Loading,
    Recommend,
    BookList
  },
  methods: {
    getData() {
      this.loading = true
      axios.get(`${this.common.api}/booklist`).then(res => {
        this.loading = false
        this.bookList = res.data
      })
    }
  },
  created() {
    this.getData()
  },
  filters: {
    hot(books) {
      if(!books) return ''
      let hotBooks = []
      books.forEach((book, index) => {
        if(index < 50 && index % 3 === 0) {
          hotBooks.push(book)
        }
      })
      return hotBooks
    },
    top(books) {
      if(!books) return ''
      let topBooks = []
      books.forEach((book, index) => {
        if(index < 50 && index % 5 === 1) {
          topBooks.push(book)
        }
      })
      return topBooks
    },
    free(books) {
      if(!books) return ''
      let freeBooks = []
      books.forEach((book, index) => {
        if(index < 50 && index % 5 === 2) {
          freeBooks.push(book)
        }
      })
      return freeBooks
    },
    newbook(books) {
      if(!books) return ''
      let newBooks = []
      books.forEach((book, index) => {
        if(index < 50 && index % 5 === 3) {
          newBooks.push(book)
        }
      })
      return newBooks.splice(0, 3)
    },
    endbook(books) {
      if(!books) return ''
      let endBooks = []
      books.forEach((book, index) => {
        if(book.serialize === '完本') {
          endBooks.push(book)
        }
      })
      return endBooks.splice(0, 3)
    },
    like(books) {
      if(!books) return ''
      let likeBooks = []
      books.forEach((book, index) => {
        if(index < 50 && index % 5 === 4) {
          likeBooks.push(book)
        }
      })
      return likeBooks.splice(0, 3)
    }
  }
}
</script>

<style lang="less" type="text/less" scoped>
  .container {
    background-color: #f6f7f9;
  }

  .nav-header {
    header {
      height: 45px;
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 20px;

      .brand {
        width: 100px;
        height: 24px;
        background: url(http://qidian.gtimg.com/qdm/img/logo-qdm.0.50.svg) no-repeat left;
        background-size: 100%;
      }

      .avatar {
        width: 24px;
        height: 24px;
        background: url(../assets/images/avatar.png) no-repeat center;
        background-size: 100%;
      }
    }
  }

  .swipe {
    height: 170px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .home-nav {
    display: flex;
    padding: 10px 0;
    margin: 10px 0;
    background-color: #fff;

    .guide-nav-div {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      > i {
        width: 24px;
        height: 24px;
        background-image: url(../assets/images/sprite.0.50.png)
      }
      &:nth-of-type(1) {
        i {
          background-position: -63px -28px;
        }
      }
      &:nth-of-type(2) {
        i {
          background-position: 0 0;
        }
      }
      &:nth-of-type(3) {
        i {
          background-position: 0 -30px;
        }
      }
      &:nth-of-type(4) {
        i {
          background-position: 0 -60px;
        }
      }
      &:nth-of-type(5) {
        i {
          background-position: -30px -30px;
        }
      }
    }
  }
</style>
