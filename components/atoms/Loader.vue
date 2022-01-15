<template>
  <div
      v-if="$store.state.loader"
      class="loader__overlay"
  >
    <div class="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
</template>
