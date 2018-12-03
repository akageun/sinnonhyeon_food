<template>
  <div class="container">
    <div class="row">
      <div class="card col-xs-12 col-lg-6 p-3" v-for="store in storeList">
        <div class="row ">
          <div class="col">
            <div class="card-block">
              <h4 class="card-title">{{store.store_nm}}</h4>

              <h6 class="card-subtitle mb-2 text-muted">
                별점 : {{store.rate}}
              </h6>

              <p class="card-text text-justify">
                {{store.store_desc}}
              </p>

              <span class="badge badge-success ml-1" v-for="(label, index) in store.label">
                {{label}}
              </span>
              <hr>
              <a class="ml-1" v-for="(link, index) in store.ref_link" :href="link" target="_blank">link_{{index+1}}</a>
            </div>
          </div>
        </div>
      </div>


      <!--<div class="card  col-sm-12 col-lg-6 p-3">-->
      <!--<div class="row ">-->
      <!--<div class="col-8">-->
      <!--<div class="card-block">-->
      <!--<h6 class="card-title text-right">Card Title</h6>-->
      <!--<p class="card-text text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et-->
      <!--dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis-->
      <!--aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat-->
      <!--non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>-->
      <!--<a href="#" class="btn btn-primary">read more...</a>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="col-4">-->
      <!--<img class="w-100" src="https://via.placeholder.com/150x150">-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="card  col-sm-12 col-lg-6 p-3">-->
      <!--<div class="row ">-->
      <!--<div class="col-md-4">-->
      <!--<img class="w-100" src="https://via.placeholder.com/150x150">-->
      <!--</div>-->
      <!--<div class="col-md-8">-->
      <!--<div class="card-block">-->
      <!--<h6 class="card-title">Card Title</h6>-->
      <!--<p class="card-text text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et-->
      <!--dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis-->
      <!--aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat-->
      <!--non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>-->
      <!--<a href="#" class="btn btn-primary">read more...</a>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->

      <!--<div class="card  col-sm-12 col-lg-6 p-3">-->
      <!--<div class="row ">-->
      <!--<div class="col-md-4">-->
      <!--<img class="w-100" src="https://via.placeholder.com/150x150">-->
      <!--</div>-->
      <!--<div class="col-md-8">-->
      <!--<div class="card-block">-->
      <!--<h6 class="card-title">Card Title</h6>-->
      <!--<p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna-->
      <!--aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure-->
      <!--dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,-->
      <!--sunt in culpa qui officia deserunt mollit anim id est laborum.</p>-->
      <!--<a href="#" class="btn btn-primary">read more...</a>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
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
