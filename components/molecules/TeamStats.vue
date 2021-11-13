<template>
  <div class="team-stats__container">
    <div class="team-stats__header">
      <span>Conference</span>
      <span>Rank</span>
      <span>Wins</span>
      <span>Loses</span>
      <span>Win percentage</span>
      <span>Home</span>
      <span>Away</span>
      <span>Games behind</span>
    </div>
    <div class="team-stats__stats">
      <span>{{ stats.conference.name.toUpperCase() }}</span>
      <span>{{ stats.conference.rank }}</span>
      <span>{{ stats.win }}</span>
      <span>{{ stats.loss }}</span>
      <span>{{ stats.winPer }}</span>
      <span>{{ stats.home.win }}-{{ stats.home.loss }}</span>
      <span>{{ stats.away.win }}-{{ stats.away.loss }}</span>
      <span>{{ stats.gamesBehind }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TeamStats',
  props: {
    stats: {
      type: Object,
      required: true
    }
  }
};
</script>
