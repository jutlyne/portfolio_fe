<template>
  <div class="admin-container">
    <a-layout v-if="isAuthRoute">
      <NavHeaderItem />
      <a-layout-content class="layout-content-parent">
        <a-layout class="layout">
          <SiderItem />
          <a-layout-content class="layout-content">
            <LoadingItem v-if="isLoading" />
            <RouterView v-show="!isLoading" />
          </a-layout-content>
        </a-layout>
      </a-layout-content>
      <a-layout-footer style="text-align: center"> Copyright © 2024 JutLy </a-layout-footer>
    </a-layout>

    <section v-else>
      <RouterView />
    </section>
  </div>
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
