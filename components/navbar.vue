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
    <div :class="{'navbar__links': true, 'navbar__links--show':openMenu}">
      <nuxt-link to="/matches">
        Matches
      </nuxt-link>
      <nuxt-link to="/players">
        Players
      </nuxt-link>
      <nuxt-link to="/teams">
        Teams
      </nuxt-link>
      <nuxt-link to="/live">
        Live
      </nuxt-link>
    </div>
    <div
        :class="{'navbar__menu': true, 'navbar__menu--open': openMenu}"
        @click="openMenu = !openMenu"
    >
      <div class="navbar__burger" />
    </div>
  </nav>
</template>
<script>
export default {
  name: 'Navbar',
  data () {
    return {
      openMenu: false
    };
  }
};
</script>
