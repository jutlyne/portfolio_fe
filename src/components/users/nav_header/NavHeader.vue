<template>
  <header class="header-container">
    <a-flex class="logo-container" gap="middle" align="center">
      <RouterLink to="/">
        <img src="https://i.imgur.com/f2ePKVX.png" alt="" srcset="" />
      </RouterLink>
    </a-flex>

    <a-menu
      class="nav-header font-large"
      v-model:selectedKeys="current"
      theme="dark"
      mode="horizontal"
      :items="items"
      @click="handleMenuClick"
    />
  </header>
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
