<template>
  <div class="app-content border">
    <div id="container" style="width: 100%; height: 740px"></div>
    <TeleportContainer />
    <addAndUpdateDialog :getProjectTree="getProjectTree" />
  </div>
</template>

<script setup>
import mindNode from "./mindNode.vue";
import { register, getTeleport } from "@antv/x6-vue-shape";
import { onMounted, ref, defineProps, watch } from "vue";
import { Graph, Cell, Node, Path, Shape } from "@antv/x6";
import Hierarchy from "@antv/hierarchy";
import { useStore } from "vuex";
import addAndUpdateDialog from "./components/addAndUpdateDialog.vue";

import { getProjectTreeApi } from "@/api/taskManage.js";
const store = useStore();

const props = defineProps(["selectRow"]);

const TeleportContainer = getTeleport();

const dataTree = ref({});
// const dataTree = ref({
//   id: "1",
//   label: "中心主题",
//   width: 280,
//   height: 100,
//   children: [
//     {
//       id: "1-1",
//       label: "分支主题1",
//       button: "998989",
//       width: 280,
//       height: 100,
//       children: [
//         {
//           id: "1-1-1",
//           label: "子主题1",
//           width: 280,
//           height: 100,
//           leaf: true,
//         },
//         {
//           id: "1-1-2",
//           label: "子主题2",
//           width: 280,
//           height: 100,
//           leaf: true,
//         },
//       ],
//     },
//     {
//       id: "1-2",
//       label: "分支主题2",
//       width: 280,
//       height: 100,
//       leaf: true,
//     },
//   ],
// });

onMounted(async () => {
  initGraph();
  await getProjectTree();
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
      const midX = sourcePoint.x + 160;
      const midY = sourcePoint.y;
      const ctrX = midX;
      const ctrY = targetPoint.y;
      const pathData = `
       M ${sourcePoint.x + 150} ${sourcePoint.y}
       L ${midX} ${midY}
       L ${ctrX} ${ctrY}
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

const deleteNode = (item) => {};

const addNode = (item) => {
  store.commit("setNodeConfig", {
    visible: true,
    title: "新增子任务",
    type: "add",
    selectRow: item,
  });
};

const updateNode = (item) => {};

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
    interacting: () => {
      edgeLabelMovable: true;
    },
    translating: () => {
      restrict: true;
    },
    mousewheel: true,
    panning: true,
  });

  render = () => {
    const result = Hierarchy.mindmap(dataTree.value, {
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
        return 20;
      },
      getSide: () => {
        return "right";
      },
    });
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
            deleteNode,
            addNode,
            updateNode,
            attrs: {},
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
  };
};

const addTreeProperty = (obj) => {
  obj.width = 280;
  obj.height = 100;
  if (obj.children) {
    obj.children.forEach(function (children) {
      addTreeProperty(children);
    });
  }
  return obj;
};

const getProjectTree = () => {
  return getProjectTreeApi({
    projectCode: props.selectRow.projectCode,
    type: "MindMap",
  }).then((res) => {
    if (res.result == "ok") {
      dataTree.value = addTreeProperty(res.data);
      render();
    }
  });
};

watch(
  () => props.selectRow,
  async () => {
    await getProjectTree();
  }
);
</script>

<style lang="less" scoped></style>
