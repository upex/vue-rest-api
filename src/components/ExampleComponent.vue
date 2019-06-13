<template>
  <div>
    <h1>{{ msg }}</h1>
    <form>
      <input type="text" v-model="name" placeholder="User name">
      <input type="email" v-model="email" placeholder="Email address">
      <button @click="addUser">Add user</button>
    </form>
    <div class="users">
      <p v-for="(item, index) in users"
      :key="index">
      {{index+1}}. {{item.name}} --- {{item.email}}
      </p>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import http from '../api/http-client'
export default {
  name: 'ExampleComponent',
  props: {
    msg: String
  },
  data() {
    return {
      users: [],
      name: ``,
      email: ``
    }
  },
  created() {
    const vm = this;
    vm.getAllUsers()
  },
  methods: {
    getAllUsers() {
      const vm = this;
      http.methods.getUsers(vm).then((resp) => {
        vm.users = resp
      })
      .catch(e => {
        console.log('e', e)
      })
    },
    addUser(e) {
      const vm = this
      e.preventDefault()
      if (vm.name && vm.email) {
        const payload = {
          name: vm.name,
          email: vm.email
        }
        http.methods.addUser(vm, payload).then((resp) => {
          vm.users = [ ...vm.users, resp]
          vm.name = ''
          vm.email = ''
        })
        .catch(e => {
          console.log('e', e)
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.users {
  text-align: center;
}
</style>
