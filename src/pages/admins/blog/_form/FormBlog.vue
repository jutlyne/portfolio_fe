<template>
  <a-form
    :label-col="{ span: 3 }"
    @finish="handleFinish"
    :wrapper-col="{ span: 21 }"
    layout="horizontal"
    :model="formState"
  >
    <a-form-item :rules="formRules.titleRules" name="title" label="Title" class="form-item">
      <a-input v-model:value="formState.title" />
    </a-form-item>

    <a-form-item
      :rules="formRules.shortTextRules"
      name="short_text"
      label="Short text"
      class="form-item"
    >
      <a-input v-model:value="formState.short_text" />
    </a-form-item>

    <a-form-item
      :rules="formRules.readRules"
      name="read_minutes"
      label="Read minutes"
      class="form-item"
    >
      <a-input-number v-model:value="formState.read_minutes" :min="0" :max="60" />
    </a-form-item>

    <a-form-item label="Tags" name="tags" :rules="formRules.tagRules" class="form-item">
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
        <template v-if="!isLoading">
          <a-upload
            list-type="picture"
            :max-count="1"
            :before-upload="beforeUpload"
            v-model:file-list="fileListItem"
            @change="handleChange"
            accept="image/*"
          >
            <a-button>
              <PlusOutlined />
              Upload
            </a-button>
          </a-upload>
        </template>
      </a-space>
    </a-form-item>

    <a-form-item label="Heading" class="form-item">
      <template v-for="heading in headings" :key="heading.key">
        <div class="heading-item">
          <a-input v-model:value="heading.title" required />
          <div v-for="child in heading.children" :key="child.key">
            <EnterOutlined />
            <a-input v-model:value="child.title" />
            <a-button class="btn-remove" @click="handleRemoveHeader(child.key)">
              <CloseOutlined />
            </a-button>
          </div>
          <a-button @click="handleAddHeader(heading.key)">
            <PlusOutlined />
            Add Child
          </a-button>
          <a-button class="btn-remove" @click="handleRemoveHeader(heading.key)">
            <CloseOutlined />
            Remove
          </a-button>
          <br />
        </div>
      </template>

      <a-button @click="handleAddHeader()">
        <PlusOutlined />
        Add
      </a-button>
    </a-form-item>

    <a-form-item label="Content" class="form-item">
      <ckeditor :editor="editor" v-model="formState.body" :config="editorConfig"></ckeditor>
    </a-form-item>

    <a-form-item class="form-item" :wrapper-col="{ span: 24 }">
      <a-button html-type="submit" @click="assignHeading" type="primary">{{ buttonText }}</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
