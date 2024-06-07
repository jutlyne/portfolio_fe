<template>
  <a-menu
    class="nav-header"
    v-model:selectedKeys="current"
    theme="dark"
    mode="horizontal"
    :items="items"
    @click="handleMenuClick"
  />
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
