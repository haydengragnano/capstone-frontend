<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <span v-if="!isLoggedIn()">
        <router-link to="/login">Login</router-link>
        |
      </span>
      <span v-if="isLoggedIn()">
        <router-link to="/logout">Logout</router-link>
        |
      </span>
      <span class="cta" v-if="!isLoggedIn()">
        <router-link to="/signup">Signup</router-link>
        |
      </span>
      <span v-if="isLoggedIn()">
        <router-link :to="`/users/${getUserId()}`">My Profile</router-link>
        |
      </span>
      <router-link to="/games">All Games</router-link>
    </div>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
export default {
  data: function () {
    return {
      flashMessage: "",
    };
  },
  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
  },
};
</script>
