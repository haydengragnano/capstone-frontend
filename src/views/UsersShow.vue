<template>
  <div class="users-show">
    <span v-if="verifyUser()">
      <router-link v-bind:to="`/users/${user.id}/edit`">Edit User</router-link>
    </span>
    <br />
    <h1>{{ user.handle }}</h1>
    <a :href="`${user.stream_url}`" target="_blank">
      <h2>{{ user.stream_url }}</h2>
    </a>
    <br />
    <img v-bind:src="user.image_url" v-bind:alt="user.handle" />
    <p>bio:{{ user.bio }}</p>
    <p>game of choice: {{ user.game.title }}</p>
    <router-link :to="`/games/${user.game.id}`"><img :src="user.game.image_url" /></router-link>
    <div v-for="tag in user.tags" v-bind:key="tag.id">
      <p>{{ tag.name }}</p>
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
