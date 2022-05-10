<template>
  <div>
    <nav class="main-nav">
      <nuxt-link :to="{ name: 'index' }">Home</nuxt-link>
      <nuxt-link :to="{ name: 'History' }">History</nuxt-link>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style>
/* nav */
.main-nav {
  text-align: center;
  margin: 40px auto;
}
.main-nav a {
  display: inline-block;
  text-decoration: none;
  margin: 0 10px;
  color: #999;
  font-size: 18px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

a.nuxt-link-exact-active {
  color: #333;
  border-bottom: 2px solid gray;
  padding-bottom: 4px;
}

main {
  padding: 25px;
}
</style>
