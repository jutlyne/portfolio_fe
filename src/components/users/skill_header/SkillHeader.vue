<template>
  <div class="blog-header">
    <h1>
      <span v-if="store.state.blogs.tagRef"> Chuyên mục #{{ store.state.blogs.tagRef }} | </span>
      <span> JutLy Blog </span>
    </h1>
    <p class="font-large">Không chỉ thông tin, mà còn là kiến thức chất lượng, sâu sắc.</p>
  </div>
  <a-flex class="custom-skill" wrap="wrap" gap="10" justify="center" align="flex-start">
    <a-button
      class="button-skill font-large"
      :class="getActiveClass(d)"
      v-for="d in data"
      :key="d"
      @click="handleSkillClick(d)"
      >{{ d }}</a-button
    >
  </a-flex>
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
