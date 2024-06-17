<template>
  <div class="create-blog-container">
    <a-form
      :label-col="labelCol"
      @finish="handleFinish"
      :wrapper-col="wrapperCol"
      layout="horizontal"
      :model="formState"
    >
      <a-form-item label="Title" class="form-item">
        <a-input v-model:value="formState.title" />
      </a-form-item>

      <a-form-item label="Short text" class="form-item">
        <a-input v-model:value="formState.short_text" />
      </a-form-item>

      <a-form-item label="Tags" class="form-item">
        <a-tree-select
          v-model:value="formState.tags"
          show-search
          style="width: 100%"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="Please select"
          allow-clear
          multiple
          tree-default-expand-all
          :tree-data="treeData"
          tree-node-filter-prop="label"
          class="select-multiple"
        >
          <template #title="{ value: val, label }">
            <b v-if="val === 'parent 1-1'" style="color: #08c">{{ val }}</b>
            <template v-else>{{ label }}</template>
          </template>
        </a-tree-select>
      </a-form-item>

      <a-form-item label="Image" class="form-item">
        <a-space direction="vertical" style="width: 100%" size="large">
          <a-upload
            list-type="picture"
            :max-count="1"
            :before-upload="beforeUpload"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          >
            <a-button>
              <PlusOutlined />
              Upload
            </a-button>
          </a-upload>
        </a-space>
      </a-form-item>

      <a-form-item label="Content" class="form-item">
        <Editor v-model="formState.content" :api-key="editorAPIKey" :init="configEditor" />
      </a-form-item>

      <a-form-item class="form-item" :wrapper-col="{ span: 24 }">
        <a-button html-type="submit" type="primary">Create</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
