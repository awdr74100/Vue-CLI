<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right">
      <button class="btn btn-primary" @click="opemModel(true)">建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">
            {{ item.origin_price | currency}}
          </td>
          <td class="text-right">
            {{ item.price | currency}}
          </td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="opemModel(false,item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm " @click="delProductModal('rm',item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination @callGetProducts="getProducts" :pagination="pagination"></Pagination>
    <!-- 新增、修改產品視窗 -->
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
                  <input type="text" v-model="tempProduct.imageUrl" class="form-control" id="image"
                    placeholder="請輸入圖片連結">
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control" ref="files" @change="uploadFile">
                </div>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid" alt="" :src="tempProduct.imageUrl">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" v-model="tempProduct.title" class="form-control" id="title" placeholder="請輸入標題">
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category" v-model="tempProduct.category"
                      placeholder="請輸入分類">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input type="unit" class="form-control" id="unit" v-model="tempProduct.unit" placeholder="請輸入單位">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price" v-model="tempProduct.origin_price"
                      placeholder="請輸入原價">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price" v-model="tempProduct.price"
                      placeholder="請輸入售價">
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description" v-model="tempProduct.description"
                    placeholder="請輸入產品描述"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content" v-model="tempProduct.content  "
                    placeholder="請輸入產品說明內容"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="tempProduct.is_enabled" :true-value="1"
                      :false-value="1" id="is_enabled">
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
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 刪除產品視窗 -->
    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="updateProduct">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from "jquery";
  import Pagination from '../Pagination';

  export default {
    data() {
      return {
        products: [],
        pagination: {},
        tempProduct: {},
        isNew: false,
        isLoading: false,
        status: {
          fileUploading: false,
        }
      }
    },
    methods: {
      getProducts(page = 1) {
        const server = process.env.API_PATH;
        const user = process.env.CUSTOM_PATH;
        const vm = this;
        const api = `${server}/api/${user}/admin/products?page=${page}`;
        vm.isLoading = true;
        this.$http.get(api).then((response) => {
          console.log(response.data);
          vm.isLoading = false;
          vm.products = response.data.products;
          vm.pagination = response.data.pagination;
        })
      },
      opemModel(isNew, item) {
        if (isNew) {
          this.tempProduct = {};
          this.isNew = true;
        } else {
          this.tempProduct = Object.assign({}, item);
          this.isNew = false;
        };
        $('#productModal').modal('show');
      },
      delProductModal(msg, item) {
        console.log(item);
        const vm = this;
        vm.tempProduct = Object.assign({}, item);
        vm.isNew = msg;
        $('#delProductModal').modal('show');
      },
      updateProduct() {
        const server = process.env.API_PATH;
        const user = process.env.CUSTOM_PATH;
        let api = `${server}/api/${user}/admin/product`;
        let httpMethods = 'post';
        const vm = this;
        if (!vm.isNew) {
          api = `${server}/api/${user}/admin/product/${vm.tempProduct.id}`;
          httpMethods = 'put';
        } else if (vm.isNew == 'rm') {
          api = `${server}/api/${user}/admin/product/${vm.tempProduct.id}`;
          httpMethods = 'delete';
        }
        this.$http[httpMethods](api, {
          data: vm.tempProduct
        }).then((response) => {

          console.log(response.data);
          if (response.data.success) {
            $('#productModal').modal('hide');
            $('#delProductModal').modal('hide');
            //  document.querySelector("#customFile").value = "";
            vm.getProducts();
          } else {
            $('#productModal').modal('hide');
            vm.getProducts();
            console.log("應用失敗");
          }

          //   vm.products = response.data.products;
        })
      },
      uploadFile() {
        const server = process.env.API_PATH;
        const user = process.env.CUSTOM_PATH;
        // 觀看console this
        console.log(this);
        const uploaderFile = this.$refs.files.files[0];
        const id = this.$refs.files.id;
        const vm = this;
        const formData = new FormData();
        formData.append("file-to-upload", uploaderFile);
        const url = `${server}/api/${user}/admin/upload`;
        vm.status.fileUploading = true;
        vm.$http.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }).then(response => {
          vm.status.fileUploading = false;
          // console.log(response.data);
          if (response.data.success) {
            // vm.tempProduct.imageUrl = response.data.imageUrl;
            vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
            document.getElementById(id).value = "";
            console.log(response.data);
          } else {
            vm.$bus.$emit('message:push', response.data.message, 'danger');
          }
        })
      }
    },
    components: {
      Pagination: Pagination,
    },
    created() {
      const vm = this;
      vm.getProducts();
      //  this.$bus.$emit('message:push',"Bang",'success');
    }
  }

</script>
