import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

import pagination from './Pagination.js';
import productModal from './ProductModal.js';
import delProductModal from './DelProductModal.js'



const app = createApp({
    data (){
        return{
            url: 'https://vue3-course-api.hexschool.io/v2',
            path: 'reirei',
            prodModal: null,
            delModal: null,
            products: [],
            pages: {},
            isNew: false,
            tempPorducts: {
                imagesUrl: [],
            },
        }
    },
    methods: {
         //確認登入
        cheakLongin() {
            axios.post(`${this.url}/api/user/check`)
            .then((res)=>{
                this.getData();
            })
            .catch((err)=>{
                alert(err.response.data.message);
                window.location = 'login.html';
            })
        },
         //取得資料
         //參數預設值
        getData(page = 1) {
            axios.get(`${this.url}/api/${this.path}/admin/products?page=${page}`)
                .then((res)=>{
                    this.products = res.data.products;
                    this.pages = res.data.pagination;
                })
                .catch((err)=>{
                    alert(err.response.data.message);
                })
        },
        //開啟modal
        openModel(states,item) {
            //新增狀態
            if(states === 'new'){
                this.tempPorducts = {
                    imagesUrl: [],
                }
                this.isNew = true;
                this.$refs.pduct.modelOpen();
            }
            //編輯狀態
            else if(states === 'edit'){
                this.isNew = false;
                this.tempPorducts = {...item};
                this.$refs.pduct.modelOpen();
            }
            //刪除狀態
            else if(states === 'delet'){
                this.tempPorducts = {...item};
                this.$refs.deModal.modelOpen();
            }
        },
        //刪除資料
        delProduct() {  
            axios.delete(`${this.url}/api/${this.path}/admin/product/${this.tempPorducts.id}`)
            .then((res) => {
                alert(res.data.message);
                this.$refs.deModal.modalClose();
                this.getData();
            }).catch((err) => {
                alert(err.response.data.message);
            })
        },
        //新增資料
        addProduct() {
            //預設為新增商品狀態
            let url = `${this.url}/api/${this.path}/admin/product`;
            let http = 'post';
            
            if (!this.isNew) {
                url = `${this.url}/api/${this.path}/admin/product/${this.tempPorducts.id}`;
                http = 'put'
            }
            
            axios[http](url, { data: this.tempPorducts })
                .then((res) =>{
                    alert(res.data.message);
                    this.$refs.pduct.modalClose();
                    this.getData();
                })
                .catch((err) =>{
                    alert(err.response.data.message);
                })
        },
        //新增圖片
        addImg() {
            this.tempProducts.imagesUrl = [];
            this.tempPorducts.imagesUrl.push('');
        },
    },
    //初始化 and Modal設定
    mounted (){
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)kawaToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common['Authorization'] = token;

        this.cheakLongin();
    },
    components: {
        pagination,
        productModal,
        delProductModal,
    }
});

app.mount('#app');