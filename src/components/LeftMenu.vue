<template>
<div>
      <mu-drawer :open="UI_open">
      <mu-appbar title="橙子电影"/>
      <mu-list>

            <router-link to="/">
              <mu-list-item title="首页" />
            </router-link>
            <router-link to="/tags">
              <mu-list-item title="分类管理" />
            </router-link>
            <router-link to="/scenes">
              <mu-list-item title="场次管理" />
            </router-link>
            <router-link to="/movies">
               <mu-list-item title="电影管理"/>
            </router-link>
            <mu-list-item @click.native="close" title="关闭"/>
      </mu-list>
    </mu-drawer>
</div>
</template>

<script>
   export default{
      name:"LeftMenu",
      computed:{
         UI_open(){
            return this.$store.getters.UI_open;
         }
      },
     
      methods:{
         close(){
              this.$store.commit('UI_open_toggle');
         }
      }
     
   }

</script>
