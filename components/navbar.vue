<template>
  <nav class="navbar__container">
    <div
        class="navbar__logo"
        @click="$router.push('/')"
    >
      <i class="fas fa-basketball-ball fa-3x" />
      <span class="navbar__logo-text">
        BasketInfo
      </span>
    </div>
    <div class="navbar__links">
      <nuxt-link to="/matches">
        Matches
      </nuxt-link>
      <nuxt-link to="/players">
        Players
      </nuxt-link>
      <nuxt-link to="/teams">
        Teams
      </nuxt-link>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'Navbar'
};
</script>
