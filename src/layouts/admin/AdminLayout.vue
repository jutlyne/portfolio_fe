<template>
  <div class="admin-container">
    <a-layout v-if="isAuthRoute" style="min-height: 100vh">
      <SiderItem />
      <a-layout>
        <NavHeaderItem />
        <a-layout-content style="margin: 16px 16px 0">
          <BreadcrumbItem />
          <div class="layout-content">
            <LoadingItem v-if="isLoading" />
            <RouterView v-show="!isLoading" />
          </div>
        </a-layout-content>
        <a-layout-footer class="layout-footer"> Copyright © 2024 JutLy </a-layout-footer>
      </a-layout>
    </a-layout>

    <section v-else>
      <RouterView />
    </section>
  </div>
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
