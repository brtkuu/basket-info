<template>
  <div class="home__container">
    <v-app>
      <div class="home__info">
        <h2 class="home__info-text">
          Follow nba games live, view statistics and stay up to date!
        </h2>
        <v-carousel v-model="carousel">
          <v-carousel-item
              v-for="photo in photos"
              :key="photo"
          >
            <v-sheet
                tile
            >
              <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
              >
                <div class="text-h2">
                  <img
                      class="home__slider-image"
                      :src="photo"
                  >
                </div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </div>
    </v-app>
    <div class="home__teams">
      <div
          v-for="team in teams"
          :key="team.id"
          class="home__logo-block"
          @click="$router.push(`/team/${team.id}`)"
      >
        <div class="home__logo-container">
          <img
              :src="team.logo"
              class="home__logo"
          >
        </div>
        <p>{{ team.name }}</p>
      </div>
    </div>
  </div>
</template>
<script>
class Team {
  constructor (data) {
    this.id = data?.teamId || '';
    this.logo = data?.logo || '';
    this.name = data?.fullName || '';
  }
}

export default {
  name: 'Home',
  data () {
    return {
      carousel: 0,
      photos: [
        'https://digitalsport.co/wp-content/uploads/2015/10/5181495847_420a196713_o.jpg',
        'https://res.cloudinary.com/hello-tickets/image/upload/c_limit,f_auto,q_auto,w_1300/v1613386565/yqq5ue9us6dw5ybdx47i.jpg',
        'https://cdn-wp.thesportsrush.com/2019/10/GettyImages-1070852540.jpg'
      ],
      teams: []
    };
  },
  mounted () {
    setInterval(() => {
      this.carousel++;
    }, 3000);
    this.getTeams();
  },
  methods: {
    async getTeams () {
      try {
        const res = await this.$axios.get('/teams/league/standard');
        this.teams = res.data.api.teams.filter(team => parseInt(team.nbaFranchise) && team.logo).map(nbaTeam => new Team(nbaTeam));
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
