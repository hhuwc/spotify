<template>
  <div class="library-pane">
    <router-link tag="div" class="tab-item" to="/fav">
      <span>Playlists</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/fav">
      <span>Songs</span>
    </router-link>
  </div>
</template>
<style lang="scss">
$--background-color: #111111;
$--base-color: #fcfafa;
.library-pane {
  color: $--base-color;
  background-color: green;
  position: absolute;
  top: 0;
  bottom: 60px;
  width: 100%;
  overflow: hidden;
}
</style>
