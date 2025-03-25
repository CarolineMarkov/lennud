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

<style>
header {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.header-title h1 {
  color: #2d3748;
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -0.5px;
}

nav {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

nav a {
  text-decoration: none;
  color: #4a5568;
  font-weight: 500;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  position: relative;
}

nav a:hover {
  background-color: rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
  color: #2b6cb0;
}

nav a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 50%;
  background-color: #3182ce;
  transition: all 0.2s ease;
}

nav a:hover::after {
  width: 80%;
  left: 10%;
}

.router-link-exact-active {
  font-weight: 600;
  color: #2b6cb0;
}

.router-link-exact-active::after {
  width: 80%;
  left: 10%;
  background-color: #3182ce;
}

@media (max-width: 640px) {
  header {
    padding: 1rem;
  }
  
  nav {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  
  .header-title h1 {
    font-size: 1.5rem;
  }
}

</style>