<template>
  <div>
    <div class="team__info">
      <img :src="teamInfo.logo">
      <h1>{{ teamInfo.name }}</h1>
    </div>
    <div
        v-if="players.length"
        class="team__players"
    >
      <PlayerCard
          v-for="player in players"
          :key="player.id"
          :player="player"
      />
    </div>
  </div>
</template>
<script>
import PlayerCard from '@/components/molecules/PlayerCard';

class Team {
  constructor (data) {
    this.id = data?.teamId || '';
    this.logo = data?.logo || '';
    this.name = data?.fullName || '';
  }
}

class Player {
  constructor (data) {
    this.firstName = data?.firstName || '';
    this.lastName = data?.lastName || '';
    this.country = data?.country || '';
    this.birthDate = data?.dateOfBirth || '';
    this.nbaStart = data?.startNba || '';
    this.height = data?.heightInMeters || '';
    this.weight = data?.weightInKilograms || '';
    this.yearsAsPro = data?.yearsPro || '';
    this.college = data?.collegeName || '';
  }
}

export default {
  name: 'TeamPage',
  components: {
    PlayerCard
  },
  data () {
    return {
      teamInfo: new Team(),
      players: []
    };
  },
  async mounted () {
    await this.getTeam();
    await this.getPlayers();
  },
  methods: {
    async getTeam () {
      try {
        const res = await this.$axios.get(`/teams/teamId/${this.$route.params.id}`);
        this.teamInfo = new Team(res.data.api.teams[0]);
      } catch (e) {
        console.log(e);
      }
    },
    async getPlayers () {
      try {
        const res = await this.$axios.get(`/players/teamId/${this.$route.params.id}`);
        this.players = res.data.api.players.filter(player => player.leagues.standard && player.dateOfBirth && player.leagues.standard?.active).map(player => new Player(player));
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
