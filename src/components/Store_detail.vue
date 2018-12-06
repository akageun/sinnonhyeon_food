<template>
  <div class="container mt-3 mb-5">
    <div class="row">
      <div class="col-12">
        <button class="btn btn-warning btn-sm" @click="$router.go(-1)">BACK</button>
        <br><br>
        <div class="card text-dark bg-light">
          <div class="card-body bg-light">
            <h5 class="card-title">{{storeInfo.store_nm}}</h5>
            <h6 class="card-subtitle mb-2 text-muted">별점 : {{storeInfo.rate}}</h6>
            <img class="" v-if="storeInfo.thumbnail_img" :src="storeInfo.thumbnail_img" :alt="storeInfo.store_nm">
            <p class="card-text text-left">{{storeInfo.store_desc}}</p>
            <p class="card-text text-right">
              <span class="badge badge-success ml-1" v-for="(label, index) in storeInfo.label">
                {{label}}
              </span>
            </p>
          </div>
          <div class="card-footer bg-white border-warning">
            <a class="card-link" v-for="(link, index) in storeInfo.ref_link" :href="link" target="_blank">Blog</a>
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
  import storeData from "../data/store_data";

  export default {
    name: "Store_detail",
    data() {
      return {
        storeInfo: {}
      }
    },
    created() {
      const tmpStoreId = this.$route.params.storeId;
      const storeFilterdList = storeData.default.filter(function (store) {
        return store.store_id == tmpStoreId;
      })

      this.storeInfo = storeFilterdList[0];
    }
  }
</script>

<style scoped>

</style>
