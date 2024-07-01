<template>
  <NavHeader />
  <HotNotice />
  <div class="user-content">
    <SkillHeader v-if="categories && categories.length" :data="categories" />
    <LoadingItem v-if="isLoading" />
    <div v-show="!isLoading">
      <RouterView />
    </div>
    <PaginateItem
      v-if="needPaginate"
      :total="totalItem"
      :currentPage="store.state.blogs.currentPage"
      :onPageChange="onPageChange"
    />
  </div>
  <FooterItem />
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
