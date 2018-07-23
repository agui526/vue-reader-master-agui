export default {
    install(Vue, options) {
        Vue.prototype.common = {
            api: 'http://127.0.0.1:3333',
            defaultImage(e) {
                e.target.src = 'http://www.zwdu.com/files/article/image/20/20962/20962s.jpg'
            }
        }
    }
}