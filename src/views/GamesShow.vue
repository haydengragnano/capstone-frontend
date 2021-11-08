<template>
  <div class="games-show">
    Search By Tag
    <br />
    <input type="text" v-model="tagSearch" />

    <!-- <div v-for="tag in tags" v-bind:key="tag.id">
      <input type="checkbox" :id="tag.id" :value="tag.name" v-model="tagSearch" />
      {{ tag.name }}
    </div> -->
    <!-- <div>
      <label class="typo__label">Tagging</label>
      <multiselect
        v-model="tagSearch"
        tag-placeholder="Add this as new tag"
        placeholder="Search or add a tag"
        label="name"
        track-by="name"
        :options="options"
        :multiple="true"
        :taggable="true"
        @tag="addTag"
      ></multiselect>
      {{ tagSearch }}
      <pre class="language-json">{{ value }}</pre>
    </div> -->
    <h1>{{ game.title }}</h1>
    <img v-bind:src="game.image_url" v-bind:alt="game.title" />
    <div v-for="user in filterBy(game.users, tagSearch, 'tags')" v-bind:key="user.id">
      <h2>{{ user.handle }}</h2>
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
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
// import Multiselect from "vue-multiselect";

export default {
  mixins: [Vue2Filters.mixin],
  // components: {
  //   Multiselect,
  // },
  data: function () {
    return {
      game: {},
      tagSearch: "",
      tags: [],
      // value: [],
      // options: [{ name: "Casual" }, { name: "Competitive" }, { name: "Ranked" }],
    };
  },

  created: function () {
    axios.get("/games/" + this.$route.params.id).then((response) => {
      console.log("games show", response);
      this.game = response.data;
    });
    axios.get("/tags/").then((response) => {
      console.log("tags index", response.data);
      this.tags = response.data;
    });
  },
  methods: {
    // addTag(newTag) {
    //   const tag = {
    //     name: newTag,
    //   };
    //   this.options.push(tag);
    //   this.value.push(tag);
    // },
  },
};
</script>
