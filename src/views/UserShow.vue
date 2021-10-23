<template>
  <div class="users-show">
    <img v-bind:src="user.image_url" v-bind:alt="user.handle" />
    <p>{{ user.handle }}</p>
    <p>bio:{{ user.bio }}</p>
    <p>game of choice:{{ user.game_id }}</p>

    <router-link v-bind:to="`/users/${user.id}/edit`">Edit User</router-link>
    |
    <router-link to="/games">Back to all games</router-link>
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
    axios.get("/users/" + this.$route.params.id).then((response) => {
      console.log("users show", response);
      this.user = response.data;
    });
  },
  methods: {},
};
</script>
