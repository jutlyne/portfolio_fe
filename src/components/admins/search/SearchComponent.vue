<template>
  <a-form layout="horizontal" :model="searchState" @finish="handleSearch">
    <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
      <a-col class="gutter-row" :span="12">
        <div class="gutter-box">
          <a-input v-model:value="searchState.title" addon-before="Title" />
        </div>
      </a-col>
      <a-col class="gutter-row" :span="12">
        <div class="gutter-box">
          <a-select
            show-search
            placeholder="Select a tag"
            v-model:value="searchState.tag"
            :options="treeData"
            size="large"
          ></a-select>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="24">
        <div class="gutter-box">
          <a-range-picker format="YYYY-MM-DD" @change="onRangeChange" />
        </div>
      </a-col>
      <a-col class="gutter-row" :span="24">
        <div class="gutter-box">
          <a-button html-type="submit" type="primary">Search</a-button>
        </div>
      </a-col>
    </a-row>
  </a-form>
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
