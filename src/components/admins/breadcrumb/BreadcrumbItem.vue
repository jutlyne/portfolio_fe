<template>
  <a-breadcrumb class="breadcrumb-container">
    <template v-for="route in routes" :key="route.breadcrumbName">
      <a-breadcrumb-item>
        <span v-if="routes.indexOf(route) === routes.length - 1">
          {{ route.breadcrumbName }}
        </span>
        <router-link v-else :to="{ name: route.path }">
          {{ route.breadcrumbName }}
        </router-link>
      </a-breadcrumb-item>
    </template>
  </a-breadcrumb>
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
