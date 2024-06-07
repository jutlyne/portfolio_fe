<template>
  <NavHeader />
  <LoadingItem v-show="isLoading" />
  <div v-show="!isLoading" style="margin-top: 4.5rem">
    <RouterView />
  </div>
  <PaginateItem
    v-if="needPaginate"
    :total="totalItem"
    :current="currentPage"
    :onPageChange="onPageChange"
  />
  <FooterItem />
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
