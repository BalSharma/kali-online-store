<template>
  <span v-if="count > 0" class="badge">
    {{count}}
  </span>
</template>
<script>
export default {
  name: 'counter-badge',
  props: ['count']
}
</script>

<style>
  .badge {
    position: absolute;
    /* top: 1rem; */
    /* right: 10px; */
    /* display:flex; */
    /* justify-content: center; */
    height: 20px;
    width: 20px;
    border-radius: 20px;
    background-color: red;
    color: #fff;
    font-weight: bold;
    font-size: 14px;
    font-style: none;
  }
</style>
