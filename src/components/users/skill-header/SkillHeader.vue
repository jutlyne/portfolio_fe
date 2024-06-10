<template>
  <div class="blog-header">
    <h1>
      <span v-if="skillTag">
        Chuyên mục #{{ skillTag }} |
      </span>
      <span>
        JutLy Blog
      </span>
    </h1>
    <p class="font-large">Nơi chứa các thông tin chất lượng mà tôi đã học được.</p>
  </div>
  <a-flex gap="10" justify="center" align="flex-start">
    <a-button class="button-skill font-large" v-for="d in data" :key="d" @click="handleSkillClick(d)">{{ d }}</a-button>
  </a-flex>
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
