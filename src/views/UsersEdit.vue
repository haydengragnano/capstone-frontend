<template>
  <div class="users-edit">
    <div class="row justify-content-md-center">
      <div class="col-md-7 col-lg-8 col-xl-8">
        <div class="page-header bordered">
          <h1>
            My profile
            <small>Manage your public profile</small>
          </h1>
        </div>
        <form v-on:submit.prevent="updateUser()">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Handle</label>
                <input type="text" v-model="user.handle" class="form-control form-control-lg" placeholder="" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Image:</label>
                <input type="text" v-model="user.image_url" class="form-control form-control-lg" placeholder="" />
              </div>
            </div>
          </div>
          <div class="form-group">
            <label>Stream url</label>
            <input
              type="text"
              v-model="user.stream_url"
              class="form-control form-control-lg"
              placeholder="Website url"
            />
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Game of choice:</label>
                <select v-model="user.game_id" class="form-control form-control-lg">
                  <option disabled value="">Please select game</option>
                  <option v-for="game in games" :key="game.id" :value="game.id">{{ game.title }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-md-15">
              <label>Bio:</label>
              <textarea
                type="text"
                v-model="user.bio"
                class="form-control form-control-lg text-editor"
                placeholder="feel free to leave your discord info :)"
              ></textarea>
            </div>
          </div>

          <br />
          <div class="col-md-6">
            <div class="form-group">
              <label>TAGS</label>
              <div v-for="tag in tags" v-bind:key="tag.id" class="form-control form-control-md">
                <label :for="tag.name">{{ tag.name }}</label>
                <input type="checkbox" :id="tag.id" :value="tag.id" v-model="selectedTagIds" />
                <br />
              </div>
            </div>
          </div>
          <div class="form-group action">
            <button type="submit" value="Update" class="btn btn-lg btn-primary">Update Profile</button>
          </div>
        </form>
        <div class="form-group action">
          <button v-on:click="destroyUser()" class="btn btn-lg btn-danger">Delete</button>
        </div>
      </div>
    </div>
    <!-- <h1>Edit User</h1>
    <form v-on:submit.prevent="updateUser()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <br />
      <label>Handle:</label>
      <input type="text" v-model="user.handle" />
      <br />
      <label>Image:</label>
      <input type="text" v-model="user.image_url" />
      <br />
      <label>Bio:</label>
      <input type="text" v-model="user.bio" placeholder="ex:discord info" />
      <br />
      <label>Stream url:</label>
      <input type="text" v-model="user.stream_url" placeholder="Website url" />
      <br />
      <label>Game of choice:</label>
      <select v-model="user.game_id">
        <option disabled value="">Please select game</option>
        <option v-for="game in games" :key="game.id" :value="game.id">{{ game.title }}</option>
      </select>
      <br />

      <h3>tags:</h3>
      <div v-for="tag in tags" v-bind:key="tag.id">
        <label :for="tag.name">{{ tag.name }}</label>
        <input type="checkbox" :id="tag.id" :value="tag.id" v-model="selectedTagIds" />
        <br />
      </div>
      <br />
      <input type="submit" value="Update" />
      <br />
    </form> -->
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
      games: "",
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
          console.log("users update", response.data);
          this.$router.push(`/users/${this.user.id}`);
        })
        .catch((error) => {
          console.log("users update error", error.response);
          this.errors = error.response.data.errors;
        });
    },
    destroyUser: function () {
      axios.delete("/users/" + localStorage.getItem("user_id")).then((response) => {
        console.log("users destroy", response);
        this.$router.push("/login");
      });
    },
  },
};
</script>
