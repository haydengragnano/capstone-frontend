<template>
  <div class="games-show">
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col col-lg-12 col-xl-10">
          <div class="row has-sidebar">
            <div class="col-md-5 col-lg-4 col-xl-4 col-sidebar">
              <div id="sidebar" class="sidebar-left">
                <div class="sidebar_inner">
                  <div class="card shadow agent-search">
                    <h3 class="subheadline mt0">Find Gamers</h3>

                    <label class="typo__label">Tagging</label>
                    <multiselect
                      v-model="filteredTags"
                      placeholder="Search or add a tag"
                      label="name"
                      track-by="name"
                      :options="tags"
                      :multiple="true"
                      :taggable="true"
                    ></multiselect>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-7 col-lg-8 col-xl-8">
              <div class="page-header bordered mt0">
                <h1>
                  {{ game.title }}
                </h1>
                <img v-bind:src="game.image_url" v-bind:alt="game.title" />
                <h3>
                  <p>
                    <strong>All these gamers are streaming {{ game.title }} right now!!!</strong>
                  </p>
                </h3>
              </div>
              <div class="sorting">
                <div class="row justify-content-between">
                  <div class="col-sm-5 col-md-5 col-lg-4 col-xl-4">
                    <div class="form-group"></div>
                  </div>
                  <div class="col-sm-6 col-md-5 col-lg-4 col-xl-3"></div>
                </div>
              </div>
              <div class="clearfix"></div>
              <div class="item-listing list">
                <div class="item" v-for="user in filteredUsersByTags" v-bind:key="user.id">
                  <div class="row">
                    <div class="col-md-3">
                      <div class="item-image">
                        <img v-bind:src="user.image_url" v-bind:alt="user.handle" class="img-fluid" />
                      </div>
                    </div>
                    <div class="col-md-9">
                      <router-link v-bind:to="`/users/${user.id}`" class="btn btn-primary float-right">
                        View Profile
                      </router-link>
                      <h3 class="item-title">
                        <h3>{{ user.handle }}</h3>
                      </h3>

                      <div class="item-description" v-for="tag in user.tags" v-bind:key="tag.id">
                        <p>{{ tag.name }}</p>
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
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
import Multiselect from "vue-multiselect";

export default {
  mixins: [Vue2Filters.mixin],
  components: {
    Multiselect,
  },
  data: function () {
    return {
      game: {},
      tagSearch: "",
      tags: [],
      value: [],
      filteredTags: [],
    };
  },

  created: function () {
    axios.get("/games/" + this.$route.params.id).then((response) => {
      console.log("games show", response);
      this.game = response.data;
    });
    axios.get("/tags/").then((response) => {
      console.log("tags index", response.data);
      this.tags = response.data;
    });
  },
  methods: {
    getUserByTag: function (users, filteredTags) {
      filteredTags.forEach((tag) => {
        users = this.filterBy(users, tag.name);
      });
      return users;
    },
  },
  computed: {
    filteredUsersByTags() {
      return this.getUserByTag(this.game.users, this.filteredTags);
    },
  },
};
</script>
