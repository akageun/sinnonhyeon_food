<template>
  <div class="container mt-3 mb-5">
    <h3>신논현 맛집</h3>
    <p class="text-right">{{storeAllList.length}}개의 맛집이 있습니다.</p>

    <div class="row">
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 mb-4 " v-for="store in storeList">
        <div class="card text-dark h-100">
          <router-link class="black-color" :to="{path: '/'+ store.store_id}">
            <img class="card-img-top" v-if="store.thum_img" :src="store.thum_img" :alt="store.store_nm">
          </router-link>
          <div class="card-body">
            <h5 class="card-title">
              <router-link class="black-color" :to="{path: '/'+ store.store_id}"><b>{{store.store_nm}}</b></router-link>
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">
              별점 : {{store.rate}}
            </h6>
            <p class="card-text text-left">
              <router-link class="black-color" :to="{path: '/'+ store.store_id}">
                {{store.store_desc}}
              </router-link>
            </p>
            <p class="card-text text-right">
              <span class="badge badge-success ml-1" v-for="(label, index) in store.label">
                {{label}}
              </span>
            </p>
          </div>
          <div class="card-footer bg-white">
            <a class="btn btn-outline-dark btn-sm mr-1" v-for="(link, index) in store.ref_link" :href="link" target="_blank">Blog</a>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <a class="btn btn-block btn-outline-secondary" v-if="isSeeMoreBtnView" @click="seeMoreBtn">SEE MORE</a>
      </div>
    </div>
  </div>
</template>

<script>
  import storeData from "../data/store_data_v2.json";

  export default {
    name: "Store_list",

    data() {
      return {
        selectedStoreNm: '',
        storeAllList: storeData,
        page_number: 0,
        page_size: 8,
        isSeeMoreBtnView: true
      }
    },
    computed: {
      storeList() {
        const tmpSelectVal = this.selectedStoreNm;
        return this.storeAllList.slice(0, (this.page_number + 1) * this.page_size).filter(function (store) {

          if (tmpSelectVal === '') {
            return store;
          }

          return store === tmpSelectVal;
        })
      }
    },
    mounted() {
      //this.initStoreListSelect2();
    },
    methods: {
      // initStoreListSelect2() {
      //   $(' .tmpSelect2').select2({
      //     placeholder: "가게명을 입력해주세요.",
      //     theme: "bootstrap",
      //   });
      // },
      seeMoreBtn() {
        this.page_number += 1;

        const tmpNextNum = (this.page_number + 1) * this.page_size;
        if (tmpNextNum >= this.storeAllList.length) {
          this.isSeeMoreBtnView = false;
        }
      }
    }
  }
</script>

<style scoped>
</style>
