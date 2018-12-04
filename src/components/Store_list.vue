<template>
  <div class="container mt-3 mb-5">
    <h3>신논현 맛집</h3>
    <h6 class="text-right">{{storeList.length}}개의 맛집이 있습니다.</h6>
    <div class="row">
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 mt-2 " v-for="store in storeList">
        <div class="card text-dark bg-light  h-100">
          <img class="card-img-top" v-if="store.thumbnail_img" :src="store.thumbnail_img" :alt="store.store_nm">
          <div class="card-body bg-light">
            <h5 class="card-title">{{store.store_nm}}</h5>
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
  import storeData from "../data/store_data";

  export default {
    name: "Store_list",
    data() {
      return {
        storeList: storeData.default
      }
    }
  }
</script>

<style scoped>

</style>
