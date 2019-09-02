<template>
  <div>
    <loading :active.sync="effect.isLoading">
      <template slot="default">
        <span class="size-xl">
          <i class="fas fa-spinner fa-spin"></i>
        </span>
      </template>
    </loading>
    <div class="adminOrderList">
      <table>
        <thead>
          <tr>
            <th class="t-m" style="text-align: left">購買時間</th>
            <th class="t-l">Email</th>
            <th class="t-xl">購買款項</th>
            <th class="t-m">應付金額</th>
            <th class="t-s">付款狀態</th>
            <th class="t-message">留言</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in orders" :key="index">
            <td class="t-m" style="text-align: left">2018/06/13</td>
            <td class="t-l">{{item.user.email}}</td>
            <td class="t-xl">飛鳥拂女佯裝 數量：6件</td>
            <td class="t-m">$6640</td>
            <td class="t-s">
              <span v-if="item.is_paid">尚未付款</span>
              <span v-else class="text-paid">已付款</span>
            </td>
            <td class="t-message">
              <span class="btn">
                <i class="fas fa-align-right"></i>
              </span>
              <!-- <div class="alert" >
                <div class="msg">
                  我要一雙鞋子，請幫忙出貨，或請幫忙背或
                </div>
              </div> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Pagination模板 -->
    <adminPagination :paginationData="pagination" @updatePagination="getOrders" v-if="pagination.current_page !== 0">
    </adminPagination>
  </div>
</template>

<script>
  import adminPagination from './adminPagination';
  import $ from 'jquery';
  export default {
    components: {
      adminPagination,
    },
    data() {
      return {
        //   全部訂單
        orders: [],
        //   Loading效果觸發
        effect: {
          isLoading: false,
        },
        //   Pagination物件
        pagination: {},
      }
    },
    methods: {
      // 取得訂單列表
      getOrders(page = 1) {
        const url = `${process.env.API_Server}/api/${process.env.API_Path}/admin/orders?page=${page}`;
        const vm = this;
        vm.effect.isLoading = true;
        vm.$http.get(url).then((response) => {
          console.log(response.data)
          vm.orders = response.data.orders;
          vm.pagination = response.data.pagination;
          vm.effect.isLoading = false;
        })
      },
    },
    created() {
      this.getOrders();
    },
  }

</script>
