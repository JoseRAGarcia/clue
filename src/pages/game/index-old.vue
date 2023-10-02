<template>
  <q-page class="row items-center justify-evenly">
    <div class="grid-container">
      <div class="item1">Header</div>
      <div class="item2">Menu</div>
      <div class="item3">Main</div>
      <div class="item4">Right</div>
      <div class="item5">Footer</div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GamePage',
});
</script>

<style scoped>
.item1 {
  grid-area: header;
}
.item2 {
  grid-area: menu;
}
.item3 {
  grid-area: main;
}
.item4 {
  grid-area: right;
}
.item5 {
  grid-area: footer;
}
.division {
  grid-area: division;
  width: 1px;
  background: #ccc;
}

.grid-container {
  width: 1000px;
  height: 1000px;
  display: grid;
  grid-template:
    'menu header header header header header' 50px
    'menu main main main right right' 50px
    'footer footer footer footer footer footer' 50px;
  grid-gap: 1px;
  background-color: #2196f3;
  padding: 1px;
}

.grid-container > div {
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>


