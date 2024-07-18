<template>
  <div class="list-container">
    <ModalConfirm :modalText="'Delete?'" :handleOk="handleConfirmDelete" ref="modalRef" />

    <a-button class="editable-add-btn" @click="handleAdd">Add</a-button>

    <a-table
      bordered
      :data-source="dataSource"
      :columns="columns"
      :scroll="{ x: 1500 }"
      :loading="tableLoading"
      :pagination="false"
      @change="fetchData"
      class="table table-tags"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'name'">
          <div class="editable-cell">
            <div v-if="editableData[record.id]" class="editable-cell-input-wrapper input-group">
              <a-input v-model:value="editableData[record.id].name" @pressEnter="save(record.id)" />
              <check-outlined class="editable-cell-icon-check" @click="save(record.id)" />
            </div>
            <div v-else class="editable-cell-text-wrapper">
              {{ text || ' ' }}
              <edit-outlined class="editable-cell-icon" @click="edit(record.id)" />
            </div>
          </div>
        </template>

        <template v-if="column.dataIndex === 'operation'">
          <a-space warp>
            <a-button type="primary" danger @click="openModal(record.id)">Delete</a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
