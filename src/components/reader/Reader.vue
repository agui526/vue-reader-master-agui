<template>
    <div class="reader">
        <top-nav></top-nav>
        <div class="read-container" :bg="bg_color" :night="bg_night" ref="fz_size">
            <h4>{{ title }}</h4>
            <div class="chapterContent" v-show="!loading">
                <p v-for="(c, i) in content" :key="i">
                    {{ c }}
                </p>
            </div>
            <div class="btn-bar" v-show="!loading">
                <ul class="btn-tab">
                    <li class="prev-btn" @click="prevChapter">上一章</li>
                    <li class="next-btn" @click="nextChapter">下一章</li>
                </ul>
            </div>
        </div>
        <div class="page-up" @click="pageUp()"></div>
        <div class="click-mask" @click="clickBar"></div>
        <div class="page-down" @click="pageDown()"></div>
        <div class="top-nav-pannel-bk font-container" v-show="font_panel"></div>
        <font-nav></font-nav>
        <bottom-nav></bottom-nav>
        <list-panel :class="{show: list_panel}" :bookId="$route.params.id"></list-panel>
        <loading v-show="loading"></loading>
    </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import axios from 'axios'

import localEvent from '../../store/local'
import TopNav from './TopNav'
import BottomNav from './BottomNav'
import FontNav from './FontNav'
import ListPanel from './ListPanel'
import Loading from '../Loading'

export default {
    data() {
        return {
            title: '',
            content: [],
            loading: false,
            bookReadInfo: {}
        }
    },
    components: {
        TopNav,
        BottomNav,
        FontNav,
        ListPanel,
        Loading
    },
    computed: {
        ...mapState([
            'font_panel', 'bg_color', 'fz_size', 'bg_night', 'curChapter', 'windowHeight', 'list_panel'
        ])
    },
    created() {
        if(localEvent.storageGetter('fz_size')) {
            this.$store.state.fz_size = localEvent.storageGetter('fz_size')
        }
        if(localEvent.storageGetter('bg_color')) {
            this.$store.state.bg_color = localEvent.storageGetter('bg_color')
        }

        const localBookReaderInfo = localEvent.storageGetter('bookreaderinfo')
        let id = this.$route.params.id

        if(localBookReaderInfo && localBookReaderInfo[id]) {
            this.bookReadInfo = localBookReaderInfo
            this.getData(id, this.bookReadInfo[id].chapter)
            this.$store.dispatch('curChapter', this.bookReadInfo[id].chapter)
        } else if (localBookReaderInfo) {
            this.bookReadInfo = localBookReaderInfo
            this.getData(id, 1)
            this.$store.dispatch('curChapter', 1)
        } else {
            this.bookReadInfo[id] = {
                book: id,
                chapter: 1
            }
            this.getData(id, 1)
            this.$store.dispatch('curChapter', 1)
        }
    },
    mounted() {
        this.$refs.fz_size.style.fontSize = this.fz_size + 'px'
    },
    methods: {
        getData(id, chapter) {
            this.loading = true
            axios.get(`${this.common.api}/book?book=${id}&id=${chapter}`).then(data => {
                this.loading = false
                this.title = data.data.title
                this.content = data.data.content.split('-')
            })
            this.$store.state.windowHeight = window.screen.height
        },
        clickBar() {
            this.$store.dispatch('toggleBar')
            this.$store.state.font_panel = false
        },
        startScroll(position, offset) {
            let timer = null
            timer = setInterval(() => {
                if(offset > 0) {
                    if(document.body.scrollTop <= position) {
                        document.body.scrollTop += offset
                    }
                    if(document.body.scrollTop > position 
                        || document.body.scrollTop + window.screen.height >= document.body.scrollHeight) {
                        clearInterval(timer)
                    }
                } else {
                    if(document.body.scrollTop >= position) {
                        document.body.scrollTop += offset
                    }
                    if(document.body.scrollTop < position || document.body.scrollTop <= 0) {
                        clearInterval(timer)
                    }
                }
            }, 1)
        },
        pageUp() {
            let position = document.body.scrollTop - window.screen.height - 80
            this.startScroll(position, -20)
        },
        pageDown() {
            let position = document.body.scrollTop + window.screen.height - 80
            this.startScroll(position, 20)
        },
        saveBookInfo() {
            let id = this.$route.params.id
            this.bookReadInfo[id] = {
                book: id,
                chapter: this.curChapter
            }
            localEvent.storageSetter('bookreaderinfo', this.bookReadInfo)
        },
        prevChapter() {
            this.$store.dispatch('prevChapter')
            this.saveBookInfo()
            setTimeout(() => {
                document.body.scrollTop = 0
            }, 0)
        },
        nextChapter() {
            this.$store.dispatch('nextChapter')
            this.saveBookInfo()
            setTimeout(() => {
                document.body.scrollTop = 0
            }, 0)
        },
        page(e) {
            if (e.keyCode === 39) {
                console.log(this.nextChapter)
                this.nextChapter()
            } else if (e.keyCode === 37) {
                this.prevChapter()
            }
        }
    },
    watch: {
        fz_size(val, oldVal) {
            this.$refs.fz_size.style.fontSize = val + 'px'
            localEvent.storageSetter('fz_size', val)
        },
        curChapter(val, oldVal) {
            localEvent.storageSetter('cur_chapter', val)
            this.getData(this.$route.params.id, val)
            this.saveBookInfo()
        }
    }
}
</script>

<style lang="less" scoped>
  .read-container {
    font-size: 16px;
    color: #555;
    line-height: 31px;
    min-height: 600px;
    padding: 15px;
    h4 {
      position: fixed;
      top: 0;
      left: 15px;
      right: 15px;
      height: 50px;
      line-height: 50px;
      font-size: 20px;
      color: #736357;
      /*border-bottom: solid 1px #736357;*/
      margin: 0 0 1em 0;
      letter-spacing: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    p {
      text-indent: 2em;
      margin: 0.5em 0;
      text-align: justify;
      letter-spacing: 0px;
      line-height: 1.5;
    }
    p:first-of-type {
      margin-top: 43px;
    }
    .btn-bar {
      z-index: 80;
      width: 80%;
      margin: 20px auto 0;
      max-width: 800px;
      .btn-tab {
        padding-left: 0;
        height: 34px;
        line-height: 34px;
        background-color: #000;
        border-radius: 8px;
        border: 1px solid #858382;
        font-size: 14px;
        opacity: 0.9;
        li {
          list-style-type: none;
          display: inline-block;
          width: 49%;
          text-align: center;
          color: #fff;
          &:nth-child(1) {
            border-right: 1px solid #858382;
          }
        }
      }
    }
  }

  .bac(@color) {
    background-color: @color;
  }

  .read-container[bg='1'] {
    .bac(#e9dfc7);
    h4 {
      .bac(#e9dfc7);
    }
  }

  .read-container[bg='2'] {
    .bac(#e7eee5);
    h4 {
      .bac(#e7eee5);
    }
  }

  .read-container[bg='3'] {
    .bac(#a4a4a4);
    h4 {
      .bac(#a4a4a4);
    }
  }

  .read-container[bg='4'] {
    .bac(#cdefcd);
    h4 {
      .bac(#cdefcd);
    }
  }

  .read-container[bg='5'] {
    .bac(#283548);
    h4 {
      .bac(#283548);
    }
  }

  .read-container[bg='6'] {
    .bac(#0f1410);
    h4 {
      .bac(#0f1410);
    }
  }

  .read-container[night='true'] {
    .bac(#0f1410);
    h4 {
      .bac(#0f1410);
    }
  }

  .page-up {
    position: fixed;
    width: 100%;
    height: 35%;
    top: 0;
    color: rgba(0, 0, 0, .1);
    z-index: 5;
  }

  .click-mask {
    position: fixed;
    width: 100%;
    height: 30%;
    top: 35%;
    color: rgba(0, 0, 0, .1);
  }

  .page-down {
    position: fixed;
    width: 100%;
    height: 35%;
    bottom: 65px;
    color: rgba(0, 0, 0, .1);
    z-index: 5;
  }

  .top-nav-pannel-bk {
    position: fixed;
    bottom: 70px;
    height: 135px;
    background: #000;
    width: 100%;
    color: #fff;
    opacity: 0.9;
    z-index: 10003
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>

