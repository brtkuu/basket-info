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
    <Teams />
  </div>
</template>
<script>
import Teams from '@/components/molecules/Teams';

export default {
  name: 'Home',
  components: {
    Teams
  },
  data () {
    return {
      carousel: 0,
      photos: [
        'https://digitteamsalsport.co/wp-content/uploads/2015/10/5181495847_420a196713_o.jpg',
        'https://res.cloudinary.com/hello-tickets/image/upload/c_limit,f_auto,q_auto,w_1300/v1613386565/yqq5ue9us6dw5ybdx47i.jpg',
        'https://cdn-wp.thesportsrush.com/2019/10/GettyImages-1070852540.jpg'
      ]
    };
  },
  mounted () {
    setInterval(() => {
      this.carousel++;
    }, 3000);
  }
};
</script>
