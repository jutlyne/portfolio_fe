<template>
  <div>
    <a-modal v-model:open="open" :title="title" :confirm-loading="confirmLoading" @ok="handleOk">
      <p>{{ modalText }}</p>
      <slot name="formInput"></slot>
    </a-modal>
  </div>
</template>

<script lang="ts" src="./index.ts" default />
