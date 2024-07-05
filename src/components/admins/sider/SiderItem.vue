<template>
  <a-layout-sider class="sider-container" v-model:collapsed="collapsed" collapsible>
    <div class="logo">
      <img src="/logo.svg" alt="" />
    </div>
    <a-menu
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
      :items="menuItemAdmin"
      theme="dark"
      mode="inline"
      @click="handleSiderClick"
      class="menu-item"
    >
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
