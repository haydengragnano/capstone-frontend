<template>
  <div id="app">
    <div id="nav">
      <nav class="navbar navbar-expand-lg navbar-dark" id="menu">
        <div class="container">
          <p class="navbar-brand" href="index.html">
            <span><img src="/img/controller (3).png" alt="" /></span>
          </p>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#menu-content"
            aria-controls="menu-content"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="menu-content">
            <div class="container">
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
              <!-- <span class="cta" v-if="!isLoggedIn()">
                <router-link to="/signup">Signup</router-link>
                |
              </span> -->
              <span v-if="isLoggedIn()">
                <router-link :to="`/users/${getUserId()}`">My Profile</router-link>
                |
              </span>
              <router-link to="/games">All Games</router-link>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<style>
#nav a {
  font-size: 2ch;

  color: #ffffff;
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
