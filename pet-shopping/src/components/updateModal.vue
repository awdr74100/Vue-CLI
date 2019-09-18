<template>
  <div>
    <!-- 編輯、新增用模板 - Product -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image" placeholder="請輸入圖片連結" v-model="tempData.imageUrl">
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control" ref="files" @change="uploadFile">
                </div>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid" alt="" :src="tempData.imageUrl">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title" placeholder="請輸入標題" v-model="tempData.title">
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category" placeholder="請輸入分類"
                      v-model="tempData.category">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input type="unit" class="form-control" id="unit" placeholder="請輸入單位" v-model="tempData.unit">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price" placeholder="請輸入原價"
                      v-model="tempData.origin_price">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price" placeholder="請輸入售價" v-model="tempData.price">
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description" placeholder="請輸入產品描述"
                    v-model="tempData.description"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content" placeholder="請輸入產品說明內容"
                    v-model="tempData.content"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="is_enabled" v-model="tempData.is_enabled"
                      :true-value="1" :false-value="2">
                    <label class="form-check-label" for="is_enabled">
                      是否上架
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="callUpdate">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 編輯、新增用模板 - Coupon -->
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增優惠卷</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title" placeholder="請輸入標題" v-model="tempData.title">
                </div>

                <div class="form-group">
                  <label for="code">優惠代碼</label>
                  <input type="text" class="form-control" id="code" placeholder="請輸入優惠代碼" v-model="tempData.code">
                </div>

                <div class="form-group">
                  <label for="date">到期日</label>
                  <input type="date" class="form-control" id="date" max="2100-12-31" v-model="tempData.due_date">
                </div>

                <div class="form-group">
                  <label for="percent">折扣百分比</label>
                  <input type="text" class="form-control" id="percent" placeholder="請輸入折扣百分比"
                    v-model="tempData.percent">
                </div>

                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="is_enabled" :true-value="1" :false-value="2"
                      v-model="tempData.is_enabled">
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="callUpdate">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 刪除通用模板 -->
    <div class="modal fade" id="delDataModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="tempData.percent">刪除優惠卷</span>
              <span v-else>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempData.title }}</strong>
            <span v-if="tempData.percent">優惠卷</span>
            <span v-else>商品</span>
            (刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="callUpdate">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['item'],
    data() {
      return {
        // 暫存資料
        cacheData: {},
        // 上傳圖片狀態
        status: false,
      }
    },
    methods: {
      // 呼叫外層方法
      callUpdate() {
        const vm = this
        vm.$emit('callUpdate', vm.cacheData);
      },
      // 上傳圖片
      uploadFile() {
        const url = `${process.env.API_Server}/api/${process.env.API_Path}/admin/upload`;
        const vm = this;
        const uploadFile = this.$refs.files.files[0];
        const uploadId = this.$refs.files.id;
        // 製作資料表單 - 以欄位/值建立相對應的的鍵/值對（key/value）集合
        const formData = new FormData();
        formData.append('file-to-upload', uploadFile);
        // end
        vm.status = true;
        vm.$http.post(url, formData, {
          'Content-Type': 'multipart/form-data',
        }).then((response) => {
          if (!response.data.success) {
            vm.$bus.$emit('message:push', response.data.message, 'danger');
          }
          vm.$set(vm.cacheData, 'imageUrl', response.data.imageUrl);
          document.getElementById(uploadId).value = '';
          vm.status = false;
        })
      }
    },
    computed: {
      // 取得快取檔案
      tempData() {
        const vm = this;
        vm.cacheData = vm.item;
        return vm.cacheData;
      },
    }
  }

</script>

<style lang="scss" scoped>
  @import '~bootstrap/scss/bootstrap';

  .btn-primary {
    color: #fff;
    background-color: rgb(76, 167, 76);
    border-color: rgb(76, 167, 76);

    &:hover {
      background-color: rgb(62, 134, 62);
      border-color: rgb(62, 134, 62);
    }

    &:active {
      background-color: rgb(62, 134, 62) !important;
      border-color: rgb(62, 134, 62) !important;
      box-shadow: 0 0 0 0.2rem rgb(62, 134, 62) !important;
    }

    &:focus {
      box-shadow: 0 0 0 0.2rem rgb(62, 134, 62);
    }
  }

</style>
