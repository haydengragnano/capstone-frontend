<template>
  <div class="users-edit">
    <h1>Edit User</h1>
    <form v-on:submit.prevent="updateUser(user)">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <label>handle:</label>
      <input type="text" v-model="user.handle" />
      <label>image:</label>
      <input type="text" v-model="user.image_url" />
      <label>bio</label>
      <input type="text" v-model="user.bio" />
      <label>game_id:</label>
      <input type="text" v-model="user.game_id" />

      <input type="submit" value="Update" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      user: {},
      errors: [],
    };
  },
  created: function () {
    axios.get("/users/" + this.$route.params.id).then((response) => {
      console.log("users show", response);
      this.user = response.data;
    });
  },
  methods: {
    updateUser: function (user) {
      var editUserParams = user;
      axios
        .patch("/users/" + user.id, editUserParams)
        .then((response) => {
          console.log("users update", response);
          this.$router.push("/users");
        })
        .catch((error) => {
          console.log("users update error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
