<template>
  <div>
    <loading :active.sync="effect.isLoading">
      <template slot="default">
        <div class="loading-pulse"></div>
      </template>
    </loading>
    <div class="adminCouponList">
      <div class="addCoupon">
        <button class="btn btn--add" @click="openModal('add')">新增優惠卷</button>
      </div>
      <table>
        <thead>
          <tr>
            <th class="t-code">優惠碼</th>
            <th class="t-l" style="text-align: left">名稱</th>
            <th class="t-s">折扣百分比</th>
            <th class="t-m">到期日</th>
            <th class="t-xs">是否啟用</th>
            <th class="t-m">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in coupons" :key="index">
            <td class="t-code">{{item.code}}</td>
            <td class="t-l">{{item.title}}</td>
            <td class="t-s">{{item.percent}}%</td>
            <td class="t-m">{{item.due_date | dateTime}}</td>
            <td class="t-xs">
              <span v-if="item.is_enabled == 1" class="text-up">啟用</span>
              <span v-else>尚未啟用</span>
            </td>
            <td class="btn-group">
              <button class="btn btn--edit" @click="openModal('edit',item)">編輯</button>
              <button class="btn btn--remove ml-3" @click="openModal('delete',item)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination模板 -->
      <Pagination :paginationData="pagination" @updatePagination="getCoupons" v-if="pagination.current_page !== 0">
      </Pagination>
    </div>
    <!-- 新增、修改商品模板 -->
    <UpdateModal @callUpdate="updateCoupon" :item="thisItem" />
  </div>
</template>

<script>
  // 載入新增、修改商品的模板
  import UpdateModal from './pageModules/UpdateModal';
  import Pagination from './pageModules/Pagination';
  // 載入完整jquery
  import $ from 'jquery';

  export default {
    components: {
      UpdateModal,
      Pagination,
    },
    data() {
      return {
        // 全部優惠卷
        coupons: [],
        // 操作模式
        doing: '',
        // 編輯或刪除的項目
        thisItem: {},
        // Loading效果觸發
        effect: {
          isLoading: false,
        },
        // Pagination
        pagination: {},
      }
    },
    methods: {
      // 取得優惠卷列表
      getCoupons(page = 1) {
        const url = `${process.env.API_Server}/api/${process.env.API_Path}/admin/coupons?page=${page}`;
        const vm = this;
        vm.effect.isLoading = true;
        vm.$http.get(url).then((response) => {
          vm.coupons = response.data.coupons;
          vm.pagination = response.data.pagination;
          vm.effect.isLoading = false;
        })
      },
      // 判斷使用者動作視窗
      openModal(mode, item) {
        const vm = this;
        vm.doing = mode;
        switch (vm.doing) {
          case 'add':
            vm.thisItem = {};
            $('#couponModal').modal('show');
            break;
          case 'edit':
            vm.thisItem = Object.assign({}, item);
            // timesTamp轉dateTime格式
            let d = new Date(vm.thisItem.due_date * 1000);
            let dateTime =
              `${d.getFullYear()}-${((d.getMonth() + 1) < 10 ? '0' : '')}${(d.getMonth() + 1)}-${((d.getDate()) < 10 ? '0' : '')}${(d.getDate())}`;
            vm.thisItem.due_date = dateTime;
            $('#couponModal').modal('show');
            break;
          case 'delete':
            vm.thisItem = Object.assign({}, item);
            $('#delDataModal').modal('show');
            break;
        }
      },
      // 更新優惠列表
      updateCoupon(cacheCoupon) {
        const vm = this;
        let url, httpMehods;
        switch (vm.doing) {
          case 'add':
            url = `${process.env.API_Server}/api/${process.env.API_Path}/admin/coupon`;
            httpMehods = 'post';
            break;
          case 'edit':
            url = `${process.env.API_Server}/api/${process.env.API_Path}/admin/coupon/${cacheCoupon.id}`;
            httpMehods = 'put';
            break;
          case 'delete':
            url = `${process.env.API_Server}/api/${process.env.API_Path}/admin/coupon/${cacheCoupon.id}`;
            httpMehods = 'delete';
            break;
        }
        // 避免淺層複製造成原物件date格式錯誤
        let CouponData = Object.assign({}, cacheCoupon);
        // 轉換為timesTamp
        let dateTime = cacheCoupon.due_date;
        var timesTamp = (new Date(dateTime)) / 1000;
        CouponData.due_date = timesTamp;
        this.$http[httpMehods](url, {
          data: CouponData
        }).then((response) => {
          $('#couponModal').modal('hide');
          $('#delDataModal').modal('hide');
          vm.$bus.$emit('message:push', response.data.message, 'success');
          vm.getCoupons();
        })
      }
    },
    created() {
      this.getCoupons();
    },
  }

</script>
