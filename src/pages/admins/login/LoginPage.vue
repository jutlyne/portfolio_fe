<template>
  <div class="form-auth">
    <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish">
      <h1 class="title">Login Form</h1>
      <InputForm label="Username" name="username" :rules="usernameRules" :formState="formState">
        <template #icon>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </InputForm>

      <InputForm label="Password" name="password" :rules="passwordRules" :formState="formState">
        <template #icon>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </InputForm>

      <a-form-item class="button-group">
        <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
          Log in
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
