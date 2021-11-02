<template>
  <div class="games-show">
    <input type="text" v-model="tagSearch" />
    <h2>{{ game.title }}</h2>
    <img v-bind:src="game.image_url" v-bind:alt="game.title" />
    <p>title: {{ game.title }}</p>
    <div v-for="user in filterBy(game.users, tagSearch, 'tags')" v-bind:key="user.id">
      <h1>{{ user.handle }}</h1>
      <img v-bind:src="user.image_url" v-bind:alt="user.handle" />
      <div v-for="tag in user.tags" v-bind:key="tag.id">
        <p>{{ tag.name }}</p>
      </div>
      <router-link v-bind:to="`/users/${user.id}`">view profile</router-link>
    </div>
    <br />
    <router-link to="/games">Back to all games</router-link>
  </div>
</template>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      game: {},
      tagSearch: "",
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
