<template>
  <a-pagination
    class="pagination font-medium"
    :current="currentPage"
    :defaultPageSize="pageSize"
    @change="onPageChange"
    :total="total"
    show-less-items
  />
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
