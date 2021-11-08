<template>
  <div class="games-index">
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col col-lg-12 col-xl-10">
          <div class="row has-sidebar">
            <div class="col-md-4 col-lg-3">
              <button id="toggle-filters" class="btn btn-primary btn-circle mobile-filter">
                <i class="fa fa-filter"></i>
              </button>
            </div>
            <div class="col-md-8 col-lg-9">
              <div class="sorting">
                <div class="row justify-content-between">
                  <div class="col-sm-5 col-md-5 col-lg-4 col-xl-3"></div>
                  <div class="col-sm-6 col-md-5 col-lg-4 col-xl-3"></div>
                </div>
              </div>
              <h1>All Games</h1>
              <div class="clearfix"></div>
              <div class="item-listing list">
                <div v-for="game in games" v-bind:key="game.id" class="item">
                  <div class="row">
                    <div class="col-lg-5">
                      <div class="item-image">
                        <router-link v-bind:to="`/games/${game.id}`">
                          <img v-bind:src="game.image_url" v-bind:alt="game.title" class="img-fluid" />
                        </router-link>
                      </div>
                    </div>
                    <div class="col-lg-7">
                      <div class="item-info">
                        <h3 class="item-title">
                          {{ game.title }}
                        </h3>
                      </div>
                      <div class="row">
                        <div class="col-md-6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <h1>All Games</h1>
    <div v-for="game in games" v-bind:key="game.id">
      <img v-bind:src="game.image_url" v-bind:alt="game.title" />
      <p>Name: {{ game.title }}</p>
      <router-link v-bind:to="`/games/${game.id}`">Veiw Gamers</router-link>
    </div>
  </div> -->
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      games: [],
    };
  },
  created: function () {
    this.indexGames();
  },
  methods: {
    indexGames: function () {
      axios.get("/games").then((response) => {
        console.log("games index", response);
        this.games = response.data;
      });
    },
  },
};
</script>
