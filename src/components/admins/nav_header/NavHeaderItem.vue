<template>
  <a-layout-header class="header" :style="{ padding: 0 }">
    <a-menu
      theme="light"
      mode="horizontal"
      :style="{ lineHeight: '64px', justifyContent: 'flex-end', paddingRight: '1rem' }"
    >
      <a-menu-item @click="openModal">Logout</a-menu-item>
    </a-menu>
    <ModalConfirm :modalText="modalContent" :handleOk="logout" ref="modalRef" />
  </a-layout-header>
</template>

<script lang="ts" src="./index.ts" default />
