<template>
  <div class="create-blog-container">
    <FormBlog :formState="formState" :handleFinish="handleFinish" buttonText='Create' />
  </div>
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
