<template>
  <div class="container mt-3 mb-5">
    <div class="row">
      <div class="col-12">
        <div class="card text-dark">
          <div class="card-body">
            <h5 class="card-title">
              <a class="btn btn-info btn-sm text-white" @click="$router.go(-1)">BACK</a>
              <b>{{storeInfo.store_nm}}</b>
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">별점 : {{storeInfo.rate}}</h6>
            <div class="row">
              <div class="col-8">
                <p class="card-text text-left">{{storeInfo.store_desc}}</p>
              </div>
              <div class="col-4">
                <img class="w-100" v-if="storeInfo.thum_img" :src="storeInfo.thum_img" :alt="storeInfo.store_nm">
              </div>
            </div>
            <br>
            <p class="card-text text-right">
              <span class="badge badge-success ml-1" v-for="(label, index) in storeInfo.label">
                {{label}}
              </span>
            </p>
          </div>
          <div class="card-footer bg-white">
            <a class="btn btn-outline-dark btn-sm mr-1" v-for="(link, index) in storeInfo.ref_link" :href="link" target="_blank">Blog</a>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <vue-disqus shortname="sinnonhyeon-food" :identifier="storeInfo.store_id+''" url="https://akageun.github.io/sinnonhyeon_food"></vue-disqus>
      </div>
    </div>
  </div>


</template>

<script>
  import storeData from "../data/store_data_v2.json";

  export default {
    name: "Store_detail",
    data() {
      return {
        storeInfo: {}
      }
    },
    created() {
      const tmpStoreId = this.$route.params.storeId;
      const storeFilterdList = storeData.filter(function (store) {
        return store.store_id == tmpStoreId;
      });

      this.storeInfo = storeFilterdList[0];
    }
  }
</script>

<style scoped>

</style>
