<template>
  <div class="date-picker__container">
    <div
        class="date-picker__nav-button"
        @click="prevWeek"
    >
      <i class="fas fa-chevron-circle-left" />
    </div>
    <div
        v-for="day in selectedWeek"
        :key="day.getDate()"
        :class="{'date-picker__day': true, 'date-picker__day--active': day.getTime() === selectedDate.getTime()}"
        @click="selectedDate = day; $emit('changeDate', day)"
    >
      <p>{{ day.getDate() }}</p>
      <p>{{ monthShort[day.getMonth()] }}</p>
    </div>
    <div
        class="date-picker__nav-button"
        @click="nextWeek"
    >
      <i class="fas fa-chevron-circle-right" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'DatePicker',
  data () {
    return {
      today: new Date(),
      weekStart: new Date(),
      selectedWeek: [],
      selectedDate: new Date(),
      monthShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    };
  },
  mounted () {
    const first = this.today.getDate() - this.today.getDay();
    const today = new Date(this.today.getTime());
    this.weekStart = new Date(today.setDate(first + 1));

    this.getWeekDays();
  },
  methods: {
    getWeekDays () {
      for (let i = 0; i < 7; i++) {
        this.selectedWeek.push(new Date(this.weekStart.getTime() + 86400000 * i));
      }
    },
    nextWeek () {
      this.selectedWeek = [];
      this.weekStart = new Date(this.weekStart.getTime() + 604800000);

      this.getWeekDays();
    },
    prevWeek () {
      this.selectedWeek = [];
      this.weekStart = new Date(this.weekStart.getTime() - 604800000);

      this.getWeekDays();
    }
  }
};
</script>
