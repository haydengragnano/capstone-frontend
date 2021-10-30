<template>
  <div class="games-show">
    <h2>{{ game.title }}</h2>
    <img v-bind:src="game.image_url" v-bind:alt="game.title" />
    <p>title: {{ game.title }}</p>
    <div v-for="user in game.users" v-bind:key="user.id">
      <p>users: {{ user.handle }}</p>
      <router-link v-bind:to="`/users/${user.id}`">view profile</router-link>
    </div>
    <br />
    <router-link to="/games">Back to all games</router-link>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      game: {},
    };
  },
  created: function () {
    axios.get("/games/" + this.$route.params.id).then((response) => {
      console.log("games show", response);
      this.game = response.data;
    });
  },
  methods: {},
};
</script>
