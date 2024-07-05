<template>
  <div class="list-container">
    <ModalConfirm :modalText="modalContent" :handleOk="handleOk" ref="modalRef">
      <template #formInput>
        <a-input
          v-if="modalInputPlaceholder"
          :placeholder="modalInputPlaceholder"
          v-model:value="replyInput"
          :maxlength="150"
          allow-clear
        />
      </template>
    </ModalConfirm>

    <a-table
      bordered
      :data-source="dataSource"
      :columns="columns"
      :scroll="{ x: 1500 }"
      :loading="tableLoading"
      @change="fetchData"
      :pagination="paginationConfig"
      class="table"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <a-space warp>
            <a-button type="primary" primary @click="openModalReply(record.id)">Reply</a-button>
            <a-button type="primary" danger @click="openModal(record.id)">Delete</a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" src="./index.ts" default />
