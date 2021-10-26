<template>
  <div class="users-show">
    <router-link v-bind:to="`/users/${user.id}/edit`">Edit User</router-link>
    |
    <router-link to="/games">Back to all games</router-link>
    <div v-for="user in users" v-bind:key="user.id">
      <!-- <img v-bind:src="user.image_url" v-bind:alt="user.handle" /> -->
      <p>{{ user.handle }}</p>
      <p>bio:{{ user.bio }}</p>
      <p>game of choice:{{ user.game_id }}</p>
    </div>
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
    axios.get("/user/:id").then((response) => {
      console.log(response.data);
      this.user = response.data;
    });
  },
  methods: {},
};
</script>
