<template>
  <div class="users-show">
    <div id="content">
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col col-lg-12 col-xl-10">
            <div class="row has-sidebar">
              <div class="col-md-5 col-lg-4 col-xl-4 col-sidebar">
                <div id="sidebar" class="sidebar-left">
                  <div class="sidebar_inner">
                    <div class="text-center">
                      <img
                        class="img-fluid img-rounded agent-thumb"
                        v-bind:src="user.image_url"
                        v-bind:alt="user.handle"
                      />
                    </div>

                    <h1>{{ user.handle }}</h1>

                    <span v-if="verifyUser()">
                      <h3 class="subheadline"></h3>
                      <router-link
                        v-bind:to="`/users/${user.id}/edit`"
                        class="btn btn-lg btn-primary btn-block"
                        data-toggle="modal"
                        data-target="#leadform"
                      >
                        Edit Profile
                      </router-link>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-7 col-lg-8 col-xl-8">
                <div class="page-header mt-0">
                  <h1>About {{ user.handle }}</h1>
                </div>
                <strong>
                  {{ user.bio }}
                </strong>
                <hr />
                <div class="lead">{{ user.handle }} is playing {{ user.game.title }} right now!</div>
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
                  <div class="item">
                    <div class="row">
                      <div class="col-lg-5">
                        <div class="item-image">
                          <strong>{{ user.game.title }}</strong>
                          <router-link :to="`/games/${user.game.id}`">
                            <img :src="user.game.image_url" class="img-fluid" />
                          </router-link>
                        </div>
                      </div>
                      <div class="col-lg-7">
                        <div class="item-info">
                          <h2 class="item-title">
                            <a :href="`${user.stream_url}`" target="_blank">
                              {{ user.stream_url }}
                            </a>
                          </h2>

                          <div class="item-details-i"></div>
                          <div class="item-details">
                            <ul>
                              <li></li>
                              <li>
                                <strong>when playing {{ user.game.title }} I play:</strong>
                                <br />
                                <br />
                                <div v-for="tag in user.tags" v-bind:key="tag.id">
                                  <p>{{ tag.name }}</p>
                                </div>
                              </li>
                            </ul>
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
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      user: { game: { title: "" } },
    };
  },
  created: function () {
    this.showUser();
  },
  methods: {
    showUser: function () {
      axios.get(`/users/${this.$route.params.id}`).then((response) => {
        console.log("User object", response.data);
        this.user = response.data;
      });
    },
    verifyUser: function () {
      if (this.$route.params.id === this.userID()) {
        return true;
      }
    },
    userID: function () {
      return localStorage.getItem("user_id");
    },
  },
};
</script>
