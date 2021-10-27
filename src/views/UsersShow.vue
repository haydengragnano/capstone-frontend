<template>
  <div class="users-show">
    <router-link v-bind:to="`/users/${user.id}/edit`">Edit User</router-link>
    |
    <router-link to="/games">Back to all games</router-link>
    <br />
    <h1>{{ user.handle }}</h1>
    <img v-bind:src="user.image_url" v-bind:alt="user.handle" />
    <p>bio:{{ user.bio }}</p>
    <p>
      game of choice: {{ user.game.title }}
      <br />
      <!-- {{ user.game.image_url }} -->
      <img v-bind:src="user.game.image_url" />
    </p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      user: {},
    };
  },
  created: function () {
    axios.get(`/users/${this.$route.params.id}`).then((response) => {
      console.log("User object", response.data);
      this.user = response.data;
    });
  },
  methods: {},
};
</script>
