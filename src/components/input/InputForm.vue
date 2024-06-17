<template>
  <a-form-item
    labelAlign="left"
    class="input-group"
    :label="label"
    :name="name"
    :rules="rules"
    v-bind="other"
  >
    <a-input class="input" v-if="name != 'password'" v-model:value="formState[name]">
      <template v-if="$slots.icon" #prefix>
        <slot name="icon"></slot>
      </template>
    </a-input>

    <a-input-password
      class="input"
      v-if="name == 'password'"
      v-model:value="formState.password"
      autocomplete="password"
    >
      <template v-if="$slots.icon" #prefix>
        <slot name="icon"></slot>
      </template>
    </a-input-password>
  </a-form-item>
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
