<template>
  <div class="container mt-3 mb-5">
    <h3>신논현 맛집</h3>
    <h6 class="text-right">{{storeAllList.length}}개의 맛집이 있습니다.</h6>
    <div class="row">
      <div class="col-12">
        <div class="form-inline">
          <div class="form-group">
            <!--<select class="form-control tmpSelect2">-->
            <!--<option :value="store.store_nm" v-for="store in storeList">{{store.store_nm}}</option>-->
            <!--</select>-->
          </div>
          <div class="form-group ">
            <!--<select class="form-control tmpSelect2" v-model="selectedStoreNm">-->
            <!--<option :value="store.store_nm" v-for="store in storeAllList">{{store.store_nm}}</option>-->
            <!--</select>-->
          </div>

        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 mt-2 " v-for="store in storeList">
        <div class="card text-dark bg-light  h-100">
          <img class="card-img-top" v-if="store.thum_img" :src="store.thum_img" :alt="store.store_nm">
          <div class="card-body bg-light">
            <h5 class="card-title">
              <router-link :to="{path: '/'+ store.store_id}">{{store.store_nm}}</router-link>

            </h5>
            <h6 class="card-subtitle mb-2 text-muted">별점 : {{store.rate}}</h6>
            <p class="card-text text-left">{{store.store_desc}}</p>
            <p class="card-text text-right">
              <span class="badge badge-success ml-1" v-for="(label, index) in store.label">
                {{label}}
              </span>
            </p>
          </div>
          <div class="card-footer bg-white border-warning">
            <a class="card-link" v-for="(link, index) in store.ref_link" :href="link" target="_blank">Blog</a>
          </div>
        </div>
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
      }
    },
    computed: {
      storeList() {
        const tmpSelectVal = this.selectedStoreNm;
        return this.storeAllList.filter(function (store) {

          if (tmpSelectVal === '') {
            return store;
          }

          return store === tmpSelectVal;
        })
      }
    },
    mounted() {
      this.initStoreListSelect2();
    },
    methods: {
      initStoreListSelect2() {
        $(' .tmpSelect2').select2({
          placeholder: "가게명을 입력해주세요.",
          theme: "bootstrap",
        });
      }
    }
  }
</script>

<style scoped>

</style>
