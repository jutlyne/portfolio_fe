<template>
  <a-flex gap="10" justify="center" align="flex-start">
    <a-button class="button-skill" v-for="d in data" :key="d">{{ d }}</a-button>
  </a-flex>
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
