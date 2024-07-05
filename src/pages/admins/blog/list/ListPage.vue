<template>
  <div class="list-container">
    <SearchComponent :searchState="searchState" :handleSearch="handleSearch" />
    <br />
    <ModalConfirm :modalText="modalContent" :handleOk="handleConfirmDelete" ref="modalRef" />

    <a-table
      bordered
      :data-source="dataSource"
      :columns="columns"
      :scroll="{ x: 1500 }"
      :loading="tableLoading"
      @change="fetchData"
      :pagination="paginationConfig"
      class="table line-clamp-2"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <a-space warp>
            <a-button type="primary" @click="edit(record.id)">Edit</a-button>
            <a-button type="primary" danger @click="openModal(record.id)">Delete</a-button>
          </a-space>
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
