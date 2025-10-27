<template>
  <div v-if="loading" class="flex justify-center items-center">
    <div class="w-6 h-6 border-4 border-steel/20 border-t-green rounded-full animate-spin"></div>
  </div>
  
  <div v-else-if="error">
    <p>{{ error }}</p>
  </div>
  
  <div v-else>
    <table class="w-full">
      <thead>
        <tr class="py-2.5 flex">
          <th v-for="(column, index) in columns" :key="column.key" :class="[
            'flex-1 text-md-14 text-steel',
            columns.length === 2 && index === 1 ? 'text-right' : 'text-left'
          ]">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data" :key="getKey(row)" class="mt-2 py-2 flex items-center">
          <td v-for="(column, index) in columns" :key="column.key" :class="[
            'flex-1 text-md-14 text-charcoal',
            columns.length === 2 && index === 1 ? 'text-right' : 'text-left'
          ]">
            <slot 
              :name="`cell-${column.key}`" 
              :row="row" 
              :value="getValue(row, column.key)"
              :column="column"
            >
              {{ getValue(row, column.key) }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
interface TableColumn {
  key: string;
  label: string;
}

interface Props {
  data: any[];
  columns: TableColumn[];
  loading?: boolean;
  error?: string | null;
}

withDefaults(defineProps<Props>(), {
  loading: false,
  error: null,
});

const getValue = (row: any, key: string) => {
  return row[key];
};

const getKey = (row: any) => {
  return row['id'];
};
</script>
