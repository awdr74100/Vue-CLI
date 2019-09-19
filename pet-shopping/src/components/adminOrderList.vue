<template>
  <div>
    <loading :active.sync="effect.isLoading">
      <template slot="default">
       <div class="loading-pulse"></div>
      </template>
    </loading>
    <div class="adminOrderList">
      <div class="selectMode">
        <div class="icon">
          <i class="fas fa-sort-down"></i>
        </div>
        <select name="" id="" v-model="selectMode">
          <option value="">顯示全部</option>
          <option value="finsh">已付款</option>
          <option value="undone">尚未付款</option>
        </select>
      </div>
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
            <td class="t-m" style="text-align: left">{{item.create_at | dateTime}}</td>
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
    <Pagination :paginationData="pagination" @updatePagination="getOrders" v-if="pagination.current_page !== 0">
    </Pagination>
  </div>
</template>

<script>
  import Pagination from './Pagination';
  import $ from 'jquery';
  export default {
    components: {
      Pagination,
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
        selectMode: '',
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
