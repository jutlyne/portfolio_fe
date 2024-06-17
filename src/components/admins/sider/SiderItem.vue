<template>
  <a-layout-sider width="200" style="background: #fff">
    <a-menu
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
      mode="inline"
      :items="menuItem"
      style="height: 100%"
      @click="handleSiderClick"
      class="menu-item"
    />
  </a-layout-sider>
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
