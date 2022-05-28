<script setup lang="ts">
import { TIncLicense } from "@/interfaces/composition";
import { ColumnProps } from "ant-design-vue/lib/table/interface";
import { PropType, ref, toRaw } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const activeName = ref<string>("component");

const props = defineProps({
  tableData: {
    type: Object as PropType<TIncLicense>,
    required: true,
  },
  licenseName: {
    type: String,
    required: true,
  },
});

const tableData = toRaw(props.tableData);

const { component_license_data, file_license_data } = tableData;
component_license_data.map((item, index) => (item["key"] = index));
file_license_data.map((item, index) => (item["key"] = index));

const componentColumns: ColumnProps[] = [
  {
    title: t(`composition.license.name`),
    dataIndex: "license_name",
  },
  {
    title: t(`license.component.name`),
    dataIndex: "count",
  },
  {
    title: t("common.operation"),
    slots: { customRender: "operation" },
    width: "18%",
  },
];

const fileColumns: ColumnProps[] = [
  {
    title: t(`composition.license.name`),
    dataIndex: "license_name",
  },
  {
    title: t(`license.file.name`),
    dataIndex: "count",
  },
  {
    title: t("common.operation"),
    slots: { customRender: "operation" },
    width: "18%",
  },
];

const handleViewCLick = () => {};
</script>

<template>
  <p>{{ t(`composition.clashDesc`, { license: props.licenseName }) }}</p>
  <as-tabs v-model:activeName="activeName">
    <as-tab-pane name="component" :title="t(`dashboard.组件许可证`)">
      <a-table
        :columns="componentColumns"
        rowKey="key"
        :dataSource="component_license_data"
      >
        <template #operation="{ record }">
          <a @click="handleViewCLick(record)">{{ $t(`common.edit`) }}</a>
        </template>
      </a-table>
    </as-tab-pane>
    <as-tab-pane name="file" :title="t(`dashboard.文件许可证`)">
      <a-table
        :columns="fileColumns"
        rowKey="key"
        :dataSource="file_license_data"
      />
    </as-tab-pane>
  </as-tabs>
</template>

<style lang="less" scoped>
p {
  font-size: 16px;
  color: #333333;
  margin-bottom: 1em;
}
</style>
