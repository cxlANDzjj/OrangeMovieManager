<template>
  <div id="app">
    <mu-appbar class="admin-mu-appbar" :class="{full:!UI_open}">
      <mu-icon-button icon=">" slot="left" @click.native="toggle" />
      <mu-flat-button label="Home" slot="right"/>
      <mu-flat-button label="Help" slot="right"/>
      <mu-icon-button icon="" slot="right"/>
    </mu-appbar>

    <left-menu></left-menu>

    <div class="admin-container" :class="{full:!UI_open}">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LeftMenu from "@/components/LeftMenu";
export default{
  name: 'App',
  computed: {
    UI_open() {
      return this.$store.getters.UI_open;
    }
  },
  methods: {
    toggle() {
      this.$store.commit("UI_open_toggle");
    }
  },
  components: {
    LeftMenu
  },
  created() {
    this.$store.dispatch('getMovies', this.$http);
  },
}
</script>

<style>
  .admin-mu-appbar {
    position: fixed;
    left: 256px;
    right: 0;
    top: 0;
    width: auto;
    transition: all .45s cubic-bezier(.23,1,.32,1)
  }
  .admin-mu-appbar.full {
    left: 0;
  }
  
  .admin-container {
    padding-top: 84px;
    padding-left: 276px;
    transition: all .45s cubic-bezier(.23,1,.32,1)
  }
  .admin-container.full {
    padding-left: 20px;
  }
</style>
