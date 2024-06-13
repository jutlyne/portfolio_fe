<template>
  <a-layout-header class="header">
    <div class="logo" />
    <a-menu
      theme="dark"
      mode="horizontal"
      :style="{ lineHeight: '64px', justifyContent: 'flex-end' }"
    >
      <a-menu-item @click="logout">Logout</a-menu-item>
    </a-menu>
  </a-layout-header>
</template>

<script src="./index.ts" />
