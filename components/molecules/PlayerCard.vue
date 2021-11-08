<template>
  <div class="player-card__container">
    <div class="player-card__column">
      <img
          :src="`${photoUrl}${player.lastName.substring(0, 5).toLowerCase()}${player.firstName.substring(0, 2).toLowerCase()}01.jpg`"
          class="player-card__image"
      >
      <p class="player-card__fullname">
        {{ player.firstName }} {{ player.lastName }}
      </p>
      <p class="player-card__info">
        <span class="player-card__info-title">Birth date:</span> {{ player.birthDate }}
      </p>
      <p class="player-card__info">
        <span class="player-card__info-title">Age:</span> {{ Math.floor((new Date().getTime() - new Date(player.birthDate).getTime()) / 31556952000) }}
      </p>
      <p class="player-card__info">
        <span class="player-card__info-title">Country:</span> {{ player.country }}
      </p>
    </div>
    <div class="player-card__column">
      <p class="player-card__info">
        <span class="player-card__info-title">Height:</span> {{ player.height }} m
      </p>
      <p class="player-card__info">
        <span class="player-card__info-title">Weight:</span> {{ player.weight }} kg
      </p>
      <p class="player-card__info">
        <span class="player-card__info-title">Drafted:</span> {{ player.nbaStart }}
      </p>
      <p class="player-card__info">
        <span class="player-card__info-title">Experience:</span> {{ player.yearsAsPro }} years
      </p>
      <p class="player-card__info">
        <span class="player-card__info-title">College:</span> {{ player.college }}
      </p>
      <i
          class="far fa-star fa-3x player-card__favorite"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'PlayerCard',
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      photoUrl: 'https://www.basketball-reference.com/req/202106291/images/players/'
    };
  }
};
</script>
