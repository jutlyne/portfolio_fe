<template>
  <div class="list-blog-container">
    <a-table
      bordered
      :data-source="dataSource"
      :columns="columns"
      :scroll="{ x: 1500 }"
      :loading="tableLoading"
      @change="handleChange"
      :pagination="paginationConfig"
      class="blog-table"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <a-popconfirm
            v-if="dataSource.length"
            title="Sure to delete?"
            @confirm="onDelete(record.key)"
          >
            <a>Delete</a>
          </a-popconfirm>
        </template>
        <template v-else-if="column.dataIndex === 'tags'">
          <span>
            <a-tag v-for="tag in record.tags" :key="tag" :color="getRandomColor()">
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
