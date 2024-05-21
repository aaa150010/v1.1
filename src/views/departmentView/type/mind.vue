<template>
  <div class="app-content border h-full relative">
    <div id="container" style="width: 100%; height: 100%"></div>
    <TeleportContainer />
    <a-modal
      v-model:open="detailVisible"
      title="查看详细"
      @ok="handleOk"
      width="800px"
      destroyOnClose
      :footer="null"
    >
      <div>
        <div>任务名称：{{ taskDetail.taskName }}</div>
        <div>任务说明：{{ taskDetail.taskDescription }}</div>
        <div>任务下发时间：{{ taskDetail.issuingTime }}</div>
        <div>任务截止时间： {{ taskDetail.endTime }}</div>
        <div>责任部门：{{ taskDetail.executionDepartmentName }}</div>
        <div>任务状态：{{ taskDetail.status }}</div>
      </div>
      <a-divider></a-divider>
      <div style="height: 500px; overflow-y: auto">
        <div v-for="item in taskDetail.feedback" :key="item.feedbackCode">
          <div>
            <div>执行部门：{{ item.feedbackDepartmentName }}</div>
            <div>执行人： {{ item.feedbackPersonName }}</div>
            <div>任务反馈时间： {{ item.submissionTime }}</div>
            <div>任务反馈说明： {{ item.progressFeedback }}</div>
            <div>
              任务反馈附件：
              <div
                v-for="(itemFile, index) in item.supportingMaterials"
                :key="index"
              >
                <a
                  class="text-blue-400 underline"
                  @click="handleDown(itemFile)"
                  >{{ itemFile.fileName }}</a
                >
              </div>
            </div>
            <div>任务自评分： {{ item.selfScore }}分</div>
          </div>
          <a-divider></a-divider>
          <div>
            <div>提交审核时间：{{ item.submissionTime }}</div>
            <div>审核时间： {{ item.reviewData.auditTime }}</div>
            <div>审核部门： {{ item.reviewData.auditDepartmentName }}</div>
            <div>审核人： {{ item.reviewData.reviewerName }}</div>
            <div>审核意见：{{ item.reviewData.auditResult }}</div>
            <div>审核说明： {{ item.reviewData.reviewComments }}</div>
          </div>
          <a-divider></a-divider>
        </div>
      </div>
    </a-modal>
    <a-button class="absolute top-2 left-2" @click="toggleCollapseAll(true)"
      >展开全部</a-button
    >
    <a-button class="absolute top-2 left-28" @click="toggleCollapseAll(false)"
      >收缩全部</a-button
    >
  </div>
</template>

<script setup>
import mindNode from "../components/mindNode.vue";
import { register, getTeleport } from "@antv/x6-vue-shape";
import { onMounted, ref, defineProps, watch } from "vue";
import { Graph, Cell, Node, Path, Shape } from "@antv/x6";
import Hierarchy from "@antv/hierarchy";
import { useStore } from "vuex";
import { getTaskDetailByCodeApi } from "@/api/departmentView.js";
import { getProjectTreeApi } from "@/api/taskManage.js";
import download from "downloadjs";
import { isLeaf } from "ant-design-vue/es/vc-cascader/utils/commonUtil";
import {exportFile} from "@/api/user";
const props = defineProps(["selectRow"]);

const TeleportContainer = getTeleport();

const dataTree = ref({});

const detailVisible = ref(false);
const taskDetail = ref({});
const selectRow = ref({});

const openDetail = async (item) => {
  selectRow.value = item;
  await getTaskDetailByCode();
  detailVisible.value = true;
};

const getTaskDetailByCode = () => {
  return getTaskDetailByCodeApi({
    taskCode: selectRow.value.taskCode,
  }).then((res) => {
    if (res.result == "ok") {
      taskDetail.value = res.data;
    }
  });
};

onMounted(async () => {
  initGraph();
  await getProjectTree(true);
});
const registerGraph = () => {
  // 注册节点
  register({
    shape: "custom-vue-node",
    component: mindNode,
  });

  // 连接器
  Graph.registerConnector(
    "mindmap",
    (sourcePoint, targetPoint, routerPoints, options) => {
      const midX = sourcePoint.x + 170;
      const midY = sourcePoint.y;
      const ctrX = midX;
      const ctrY = targetPoint.y;
      let a = 0;
      let b = ctrY - midY;
      if (Math.sign(b) == 1) {
        a = 8;
      } else if (Math.sign(b) == -1) {
        a = -8;
      }
      const pathData = `
       M ${sourcePoint.x + 160} ${sourcePoint.y}
       L ${midX} ${midY}
       L ${ctrX} ${ctrY - a}
       C ${ctrX} ${ctrY - a} , ${ctrX} ${ctrY} , ${targetPoint.x - 4} ${
        targetPoint.y
      }
      L ${targetPoint.x} ${targetPoint.y}
      `;
      return options.raw ? Path.parse(pathData) : pathData;
    },
    true
  );
  // 边
  Graph.registerEdge(
    "mindmap-edge",
    {
      inherit: "edge",
      connector: {
        name: "mindmap",
      },
      attrs: {
        line: {
          targetMarker: "",
          stroke: "#A2B1C3",
          strokeWidth: 2,
        },
      },
      zIndex: 0,
    },
    true
  );
};
registerGraph();

let render;

const initGraph = () => {
  const graph = new Graph({
    container: document.getElementById("container"),
    grid: {
      size: 10,
      visible: true,
    },
    connecting: {
      connectionPoint: "anchor",
    },
    autoResize: true,
    interacting: () => {
      edgeLabelMovable: true;
    },
    translating: () => {
      restrict: true;
    },
    mousewheel: true,
    panning: true,
  });

  render = (first, dataTreeVar) => {
    let initTranslate = graph.translate();
    let initZoom = graph.zoom();
    const result = Hierarchy.mindmap(
      dataTreeVar
        ? dataTreeVar
        : filtersDataTree(JSON.parse(JSON.stringify(dataTree.value))),
      {
        direction: "H",
        getHeight(d) {
          return d.height;
        },
        getWidth(d) {
          return d.width;
        },
        getHGap() {
          return 20;
        },
        getVGap() {
          return 22;
        },
        getSide: () => {
          return "right";
        },
      }
    );
    const cells = [];
    const traverse = (hierarchyItem) => {
      if (hierarchyItem) {
        const { data, children } = hierarchyItem;
        cells.push(
          graph.createNode({
            id: data.id,
            shape: "custom-vue-node",
            x: hierarchyItem.x,
            y: hierarchyItem.y,
            width: data.width,
            height: data.height,
            data: data,
            attrs: {},
            graph: graph,
            openDetail: openDetail,
            toggleCollapse: toggleCollapse,
          })
        );
        if (children) {
          children.forEach((item) => {
            const { id, data } = item;
            cells.push(
              graph.createEdge({
                shape: "mindmap-edge",
                source: {
                  cell: hierarchyItem.id,
                },
                target: {
                  cell: id,
                  anchor: {
                    name: "left",
                  },
                },
              })
            );
            traverse(item);
          });
        }
      }
    };
    traverse(result);
    graph.resetCells(cells);
    graph.centerContent();
    if (first) {
      graph.centerContent();
    } else {
      graph.zoomTo(initZoom);
      graph.translate(initTranslate.tx, initTranslate.ty);
    }
  };
};

const addTreeProperty = (obj, isCollapseVar, isAll) => {
  obj.width = 280;
  obj.height = 120;
  obj.isCollapse = isCollapseVar == false ? isCollapseVar : true;
  if (obj.children && obj.children.length > 0) {
    obj.children.forEach(function (children) {
      addTreeProperty(children, isAll ? isCollapseVar : false, isAll);
    });
  } else {
    obj.isLeaf = true;
  }
  return obj;
};

const toggleCollapse = (id, flag) => {
  traverseTreeAndModify(dataTree.value, id, "isCollapse", flag);
  let newDataTree = filtersDataTree(JSON.parse(JSON.stringify(dataTree.value)));
  render(false, newDataTree);
};

const filtersDataTree = (obj) => {
  if (!obj.isCollapse) {
    obj.children = null;
  } else {
    if (obj.children && obj.children.length > 0) {
      obj.children.forEach((item) => {
        filtersDataTree(item);
      });
    }
  }
  return obj;
};

// 定义一个函数来遍历树并查找节点
const traverseTreeAndModify = (
  node,
  targetId,
  attributeName,
  attributeValue
) => {
  // 检查当前节点是否是目标节点
  if (node.id === targetId) {
    // 找到目标节点，改变属性值
    node[attributeName] = attributeValue;
  }

  // 递归遍历子节点
  if (node.children && node.children.length > 0) {
    node.children.forEach((childNode) => {
      traverseTreeAndModify(childNode, targetId, attributeName, attributeValue);
    });
  }
};

const getProjectTree = (first) => {
  return getProjectTreeApi({
    projectCode: props.selectRow.projectCode,
    type: "MindMap",
  }).then((res) => {
    if (res.result == "ok") {
      dataTree.value = addTreeProperty(res.data);
      render(first);
    }
  });
};

const handleDown = (item) => {
  let newUrl = item.url.replace(/sid=(\w+(-\w+){3,})/, 'sid=@sid').replace('.','').replace("@sid", localStorage.getItem("sid"))
  let link =`${import.meta.env.VITE_APP_BASE_API}/portal/r${newUrl}`
  exportFile(link,item.label)
};

const toggleCollapseAll = (flag) => {
  dataTree.value = addTreeProperty(dataTree.value, flag, true);
  let newDataTree = filtersDataTree(JSON.parse(JSON.stringify(dataTree.value)));
  render(false, newDataTree);
};

watch(
  () => props.selectRow,
  async () => {
    await getProjectTree(true);
  }
);
</script>

<style></style>
