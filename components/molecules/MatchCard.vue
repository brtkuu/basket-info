<template>
  <div class="matches__single-match">
    <div>
      <nuxt-link :to="`/team/${match.hTeam.id}`">
        <img
            class="matches__team-logo"
            :src="match.hTeam.logo"
        >
      </nuxt-link>
      <p>{{ match.hTeam.shortName }}</p>
    </div>
    <div>
      <nuxt-link :to="`/team/${match.vTeam.id}`">
        <img
            class="matches__team-logo"
            :src="match.vTeam.logo"
        >
      </nuxt-link>
      <p>
        {{ match.vTeam.shortName }}
      </p>
    </div>
    <p class="matches__points">
      {{ match.hTeam.points }} - {{ match.vTeam.points }}
    </p>
    <nuxt-link
        v-if="match.status === 'Finished'"
        :to="`/game/details/${match.id}`"
        class="matches__details"
    >
      Details
    </nuxt-link>
  </div>
</template>
<script>
export default {
  name: 'MatchCard',
  props: {
    match: {
      type: Object,
      required: true
    }
  }
};
</script>
