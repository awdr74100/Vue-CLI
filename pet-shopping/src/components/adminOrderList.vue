<template>
  <div>
    <loading :active.sync="effect.isLoading">
      <template slot="default">
        <div class="loading-pulse"></div>
      </template>
    </loading>
    <div class="adminOrderList">
      <!-- <div class="selectMode">
        <div class="icon">
          <i class="fas fa-sort-down"></i>
        </div>
        <select name="" id="" v-model="selectMode">
          <option value="">顯示全部</option>
          <option value="finsh">已付款</option>
          <option value="undone">尚未付款</option>
        </select>
      </div> -->
      <table>
        <thead>
          <tr>
            <th class="t-m" style="text-align: left">購買時間</th>
            <th class="t-l">購買款項</th>
            <th class="t-m">結帳金額</th>
            <th class="t-s">付款狀態</th>
            <th class="t-m">買家資訊</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in orders" :key="index">
            <td class="t-m" style="text-align: left">{{item.create_at | dateTime}}</td>
            <td class="t-l">
              <ul>
                <li class="productItem" v-for="(productItem,index) in item.products" :key="index">
                  <p>{{productItem.product.title}}<span class="unit">{{productItem.qty}} /
                      {{productItem.product.unit}}</span></p>
                </li>
              </ul>
            </td>
            <td class="t-m">{{item.total | dollar}}</td>
            <td class="t-s">
              <span v-if="!item.is_paid">尚未付款</span>
              <span v-else class="text-paid">已付款</span>
            </td>
            <td class="t-user">
              <div class="userData">
                <button class="userData__btn" :class="{'userData__btn--active':userDataId == item.id && userDataOpen}"
                  @click="openUserData(item.id,!userDataOpen)">查看內容</button>
                <div class="userData__content"
                  :class="{'userData__content--open':userDataId == item.id && userDataOpen}">
                  <p class="name">姓名：{{item.user.name}}</p>
                  <p class="email">郵箱：{{item.user.email}}</p>
                  <p class="address">地址：{{item.user.address}}</p>
                  <p class="tel">電話：{{item.user.tel}}</p>
                  <p class="message">備註：{{item.message}}</p>
                </div>
              </div>
            </td>
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
        // 全部訂單
        orders: [],
        // Loading效果觸發
        effect: {
          isLoading: false,
        },
        // Pagination物件
        pagination: {},
        selectMode: '',
        // 獲取指定買家資訊
        userDataId: '',
        // 打開指定買家資訊
        userDataOpen: false,
      }
    },
    methods: {
      // 取得訂單列表
      getOrders(page = 1) {
        const url = `${process.env.API_Server}/api/${process.env.API_Path}/admin/orders?page=${page}`;
        const vm = this;
        vm.effect.isLoading = true;
        vm.$http.get(url).then((response) => {
          vm.orders = response.data.orders;
          vm.pagination = response.data.pagination;
          vm.effect.isLoading = false;
        })
      },
      // 打開買家資訊
      openUserData(id, active) {
        const vm = this;
        if (id == vm.userDataId) {
          vm.userDataOpen = active;
          vm.userDataId = id;
        } else {
          vm.userDataId = id;
          vm.userDataOpen = true;
        }
      }
    },
    created() {
      this.getOrders();
    },
  }

</script>
