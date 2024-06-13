<template>
  <a-form-item label="Upload">
    <a-upload action="/upload.do" list-type="picture-card">
      <div>
        <PlusOutlined />
        <div style="margin-top: 8px">Upload</div>
      </div>
    </a-upload>
  </a-form-item>
</template>

<script src="./index.ts" />
<style lang="scss" src="./style.scss" />
