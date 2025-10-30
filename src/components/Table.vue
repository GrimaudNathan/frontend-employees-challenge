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
        <tr v-for="row in data" :key="String(getKey(row))" class="mt-2 py-2 flex items-center">
          <td v-for="(column, index) in columns" :key="column.key" :class="[
            'flex-1 text-md-14 text-charcoal',
            columns.length === 2 && index === 1 ? 'text-right' : 'text-left'
          ]">
            <slot 
              :name="`cell-${String(column.key)}`" 
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

<script setup lang="ts" generic="GuiT extends Record<string, unknown>">
interface TableColumn<T extends Record<string, unknown>> {
  key: keyof T;
  label: string;
}

interface Props<T extends Record<string, unknown>> {
  data: T[];
  columns: readonly TableColumn<T>[];
  loading?: boolean;
  error?: string | null;
}

withDefaults(defineProps<Props<GuiT>>(), {
  loading: false,
  error: null,
});

const getValue = <K extends keyof GuiT>(row: GuiT, key: K): GuiT[K] => {
  return row[key];
};

const getKey = (row: GuiT): unknown => {
  const idKey = 'id' as keyof GuiT;
  return row[idKey];
};
</script>
