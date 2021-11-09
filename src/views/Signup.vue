<template>
  <div class="signup">
    <div id="content">
      <div class="container">
        <div class="row justify-content-md-center align-items-center">
          <div class="col col-md-6 col-lg-5 col-xl-4">
            <ul class="nav nav-tabs tab-lg" role="tablist">
              <li role="presentation" class="nav-item">
                <router-link class="nav-link" v-bind:to="`/login`">Login</router-link>
              </li>
              <li role="presentation" class="nav-item">
                <router-link class="nav-link active" v-bind:to="`/signup`">Sign up</router-link>
              </li>
            </ul>
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane active" id="login">
                <form v-on:submit.prevent="submit()">
                  <div class="form-group">
                    <label for="handle">Handle</label>
                    <input
                      type="text"
                      v-model="newUserParams.handle"
                      class="form-control form-control-lg"
                      placeholder="Handle"
                    />
                  </div>
                  <div class="form-group">
                    <label for="email">Email address</label>
                    <input
                      type="email"
                      v-model="newUserParams.email"
                      id="email"
                      class="form-control form-control-lg"
                      placeholder="Email"
                    />
                  </div>
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      v-model="newUserParams.password"
                      id="password"
                      class="form-control form-control-lg"
                      placeholder="password"
                    />
                  </div>
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      v-model="newUserParams.password_confirmation"
                      id="password"
                      class="form-control form-control-lg"
                      placeholder="Password Confirmation"
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
      <h1>Signup</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Handle:</label>
        <input type="text" v-model="newUserParams.handle" />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" v-model="newUserParams.email" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="newUserParams.password" />
      </div>
      <div>
        <label>Password confirmation:</label>
        <input type="password" v-model="newUserParams.password_confirmation" />
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
      newUserParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
