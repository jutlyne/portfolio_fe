<template>
  <div class="blog-header">
    <h1>
      <span v-if="store.state.blogs.tagRef">
        Chuyên mục #{{ store.state.blogs.tagRef.name }} |
      </span>
      <span> JutLy Blog </span>
    </h1>
    <p class="font-large">The best way to learn is to share.</p>
  </div>
  <a-flex class="custom-skill" wrap="wrap" gap="10" justify="center" align="flex-start">
    <a-button
      class="button-skill font-large"
      :class="getActiveClass(d.id)"
      v-for="d in data"
      :key="d.id"
      @click="handleSkillClick(d)"
      >{{ d.name }}</a-button
    >
  </a-flex>
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
