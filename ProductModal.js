export default {
  data() {
    return {
      prodModal: null,
    }
  },
  props: ['tempPorducts', 'addProduct', 'addImg', 'isNew'],
  template: `<div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>


        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-2">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">主要圖片</label>
                  <input v-model="tempPorducts.imageUrl" id="imageUrl" type="text" class="form-control"
                    placeholder="請輸入圖片連結">
                </div>
                <img class="img-fluid" :src="tempPorducts.imageUrl" :alt="tempPorducts.imageUrl">
              </div>

              <!-- 新增多圖 -->
              <h3 class="mb-3">新增多圖</h3>
              <!-- 判斷tempPorducts.imagesUrl是否為陣列，使用Array.isArray原生語法-->
              <template v-if="Array.isArray(tempPorducts.imagesUrl)">
                <div class="mb-1" v-for="(img, key) in tempPorducts.imagesUrl" :key="key">
                  <div class="mb-3">
                    <label for="imageUrl" class="form-label">圖片網址</label>
                    <!-- 加入index來判斷是第幾個圖片 -->
                    <input type="text" v-model="tempPorducts.imagesUrl[key]" class="form-control"
                      placeholder="請輸入圖片連結">
                  </div>
                  <img :src="img" alt="img" class="img-fluid">
                </div>
                <template v-if="!tempPorducts.imagesUrl.length || tempPorducts.imagesUrl[tempPorducts.imagesUrl - 1]">
                  <!-- 陣列內沒有圖片 or 最後一張照片是否為真值 -->
                  <button class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="tempPorducts.imagesUrl.push('')">新增圖片
                  </button>
                </template>
                <template v-else>
                  <button class="btn btn-outline-danger btn-sm d-block w-100" @click="tempPorducts.imagesUrl.pop()">
                    刪除圖片
                  </button>
                </template>
              </template>
              <template v-else>
                <button class="btn btn-outline-primary btn-sm d-block w-100" @click="addImg">新增圖片
                </button>
              </template>
            </div>


            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input v-model="tempPorducts.title" id="title" type="text" class="form-control" placeholder="請輸入標題">
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input v-model="tempPorducts.category" id="category" type="text" class="form-control"
                    placeholder="請輸入分類">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="unit" class="form-label">單位</label>
                  <input v-model="tempPorducts.unit" id="unit" type="text" class="form-control" placeholder="請輸入單位">
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input v-model.number="tempPorducts.origin_price" id="origin_price" type="number" min="0"
                    class="form-control" placeholder="請輸入原價">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input v-model.number="tempPorducts.price" id="price" type="number" min="0" class="form-control"
                    placeholder="請輸入售價">
                </div>
              </div>
              <hr>

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea v-model="tempPorducts.description" id="description" type="text" class="form-control"
                  placeholder="請輸入產品描述">
                  </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea v-model="tempPorducts.content" id="description" type="text" class="form-control"
                  placeholder="請輸入說明內容">
                  </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input v-model="tempPorducts.is_enabled" id="is_enabled" class="form-check-input" type="checkbox"
                    :true-value="1" :false-value="0">
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click.prevent="addProduct">
            確認
          </button>
        </div>
      </div>
    </div>
    </div>`,
  methods: {
    modelOpen() {
      this.prodModal.show();
    },
    modalClose() {
      this.prodModal.hide();
    }
  },
  mounted() {
    this.prodModal = new bootstrap.Modal(this.$refs.productModal), {
      keyboard: false,
      backdorop: 'static'
    };
  }
};