<template>
  <a-pagination
    class="pagination"
    :defaultPageSize="pageSize"
    @change="onPageChange"
    :total="total"
  />
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
