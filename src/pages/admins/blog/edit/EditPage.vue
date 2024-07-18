<template>
  <div class="update-blog-container">
    <FormBlog :formState="formState" :fileUrl="fileUrl" :handleFinish="handleFinish" buttonText='Update' />
  </div>
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
