<template>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

ul {
  list-style-type: none;
}

.container {
  margin: 20px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.button {
  background-color: #1867c0;
  height: 36px;
  min-width: 64px;
  padding: 8px 16px;
  margin: 5px;
  border-radius: 4px;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}

</style>
