<template>
  <a-flex justify="center" align="center" class="form-auth">
    <a-form
      :model="formState"
      :label-col="{ span: 8 }"
      name="normal_login"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      class="login-form"
      @finish="onFinish"
    >
      <h1 class="title">Login Form</h1>

      <a-form-item label="Username" name="username" :rules="usernameRules">
        <a-input v-model:value="formState.username">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item label="Password" name="password" :rules="passwordRules">
        <a-input-password v-model:value="formState.password">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item class="button-group" :wrapper-col="{ offset: 8, span: 16 }">
        <a-button :disabled="disabled" type="primary" html-type="submit"> Login </a-button>
      </a-form-item>
    </a-form>
  </a-flex>
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
