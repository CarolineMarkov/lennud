<template>
    <!-- see on võetud ülikoolis loodud projektist-->
    <header>
      <div class="header-title">
        <h1> Lennureisid </h1>
      </div>
      <nav>
        <router-link to="/">Lennu valimine</router-link>
        <router-link to="/istekohtadeSoovitamine">Istekohtade soovitamine</router-link>

  
      </nav>
    </header>
  </template>

<script>
export default {
  name: 'HeaderComponent',
};
</script>

<style scoped>
.header-title h1 {
  font-size: 1.5rem;
  color: #333;
}
header {
  background-color: #ddd;
  padding: 10px;
}
nav {
  display: flex;
  gap: 15px;
}
router-link {
  text-decoration: none;
  color: #000;
}
</style>