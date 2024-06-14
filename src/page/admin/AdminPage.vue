<template>
  <div class="admin-container">
    <a-layout v-if="isAuthRoute">
      <NavHeaderItem />
      <a-layout-content style="padding: 0 50px">
        <a-layout style="padding: 24px 0; background: #fff">
          <SiderItem />
          <a-layout-content :style="{ padding: '0 24px', minHeight: 'calc(100vh - 12.2rem)' }">
            <RouterView />
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
