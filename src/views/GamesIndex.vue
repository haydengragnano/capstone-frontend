<template>
  <div class="games-index">
    <h1>All Games</h1>
    <div v-for="game in games" v-bind:key="game.id">
      <h2>{{ game.name }}</h2>
      <img v-bind:src="game.image_url" v-bind:alt="game.title" />
      <p>Name: {{ game.title }}</p>
      <router-link v-bind:to="`/games/${game.id}`">Veiw Gamers</router-link>
    </div>
  </div>
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
