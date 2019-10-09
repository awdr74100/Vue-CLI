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
            <!-- <th class="t-l">Email</th> -->
            <th class="t-l">購買款項</th>
            <th class="t-m">應付金額</th>
            <th class="t-s">付款狀態</th>
            <!-- <th class="t-message">留言</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in orders" :key="index">
            <td class="t-m" style="text-align: left">{{item.create_at | dateTime}}</td>
            <!-- <td class="t-l">{{item.user.email}}</td> -->
            <td class="t-l">
              <ul class="list">
                <li class="list__item" v-for="(productItem,index) in item.products" :key="index">
                  <p>{{productItem.product.title}}<span class="unit">3 / 個</span></p>
                </li>
              </ul>
            </td>
            <td class="t-m">{{item.total | dollar}}</td>
            <td class="t-s">
              <span v-if="!item.is_paid">尚未付款</span>
              <span v-else class="text-paid">已付款</span>
            </td>
            <!-- <td class="t-message">
              <span class="btn">
                <i class="fas fa-align-right"></i>
              </span>
            </td> -->
          </tr>
        </tbody>
      </table>
      <!-- Pagination模板 -->
      <Pagination :paginationData="pagination" @updatePagination="getOrders" v-if="pagination.current_page !== 0">
      </Pagination>
    </div>
  </div>
</template>

<script>
  import Pagination from './pageModules/Pagination';
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
          console.log(response.data);
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
