<template>
  <div class="users-edit">
    <h1>Edit User</h1>
    <form v-on:submit.prevent="updateUser()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <span>user: {{ user }}</span>
      <br />
      <label>handle:</label>
      <input type="text" v-model="user.handle" />
      <br />
      <label>image:</label>
      <input type="text" v-model="user.image_url" />
      <br />
      <label>bio</label>
      <input type="text" v-model="user.bio" />
      <br />
      <label>stream url</label>
      <input type="text" v-model="user.stream_url" />
      <br />
      <select v-model="user.game_id">
        <option disabled value="">Please select game</option>
        <option v-for="game in games" :key="game.id" :value="game.id">{{ game.title }}</option>
      </select>
      <br />
      <label>tags</label>
      <div v-for="tag in tags" v-bind:key="tag.id">
        <label :for="tag.name">{{ tag.name }}</label>
        <input type="checkbox" :id="tag.id" :value="tag.id" v-model="selectedTagIds" />
        <br />
      </div>
      <span>Checked tags: {{ selectedTagIds }}</span>

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
      tags: [],
      selectedTagIds: [],
    };
  },
  created: function () {
    axios.get("/users/" + this.$route.params.id).then((response) => {
      console.log("users show", response.data);
      this.user = response.data;
      this.selectedTagIds = this.user.tags.map((tag) => tag.id);
      console.log(this.selectedTagIds);
    });
    axios.get("/tags/").then((response) => {
      console.log("tags index", response.data);
      this.tags = response.data;
    });
    axios.get("/games/").then((response) => {
      console.log("games index", response.data);
      this.games = response.data;
    });
  },
  methods: {
    updateUser: function () {
      var editUserParams = this.user;
      editUserParams.tag_ids = this.selectedTagIds;
      axios
        .patch("/users/" + this.user.id, editUserParams)
        .then((response) => {
          console.log("users update", response);
          this.$router.push(`/users/${this.user.id}`);
        })
        .catch((error) => {
          console.log("users update error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
