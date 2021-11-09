<template>
  <div class="login">
    <div id="content">
      <div class="container">
        <div class="row justify-content-md-center align-items-center">
          <div class="col col-md-6 col-lg-5 col-xl-4">
            <ul class="nav nav-tabs tab-lg" role="tablist">
              <li role="presentation" class="nav-item">
                <router-link class="nav-link active" v-bind:to="`/login`">Login</router-link>
              </li>
              <li role="presentation" class="nav-item"><router-link v-bind:to="`/signup`">Sign up</router-link></li>
            </ul>
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane active" id="login">
                <form v-on:submit.prevent="submit()">
                  <div class="form-group">
                    <label for="email">Email address</label>
                    <input
                      type="email"
                      id="email"
                      class="form-control form-control-lg"
                      placeholder="Email"
                      v-model="newSessionParams.email"
                    />
                  </div>
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      class="form-control form-control-lg"
                      placeholder="Password"
                      v-model="newSessionParams.password"
                    />
                  </div>
                  <button type="submit" value="Submit" class="btn btn-primary btn-lg">Sign In</button>
                </form>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
    <form v-on:submit.prevent="submit()">
      <h1>Login</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Email:</label>
        <input type="email" v-model="newSessionParams.email" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="newSessionParams.password" />
      </div>
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newSessionParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios.post("/sessions", this.newSessionParams).then((response) => {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        localStorage.setItem("user_id", response.data.user_id);
        this.$router.push(`/users/${response.data.user_id}/edit`);
        // this.$router.push(`/users/${this.user}/edit`);
      });
    },
  },
};
</script>
