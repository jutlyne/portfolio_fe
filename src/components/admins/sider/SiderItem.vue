<template>
  <a-layout-sider width="200" style="background: #fff">
    <a-menu
      v-model:selectedKeys="selectedKeys2"
      v-model:openKeys="openKeys"
      mode="inline"
      style="height: 100%"
    >
      <a-sub-menu key="sub1">
        <template #title>
          <span> Blog </span>
        </template>
        <a-menu-item key="1">List</a-menu-item>
        <a-menu-item key="2">Create</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script src="./index.ts" />
