import mxgraph from '@/utils/mxgraph'
const {mxGraph, mxClient, mxCodec, mxUtils, mxConstants, mxPerimeter} = mxgraph;


//帮助文档
/**
 * 
 * insertVertex
 * 
 * parent - <mxCell> that specifies the parent of the new vertex.
 * id - Optional string that defines the Id of the new vertex.
 * value - Object to be used as the user object.
 * x - Integer that defines the x coordinate of the vertex.
 * y - Integer that defines the y coordinate of the vertex.
 * width - Integer that defines the width of the vertex.
 * height - Integer that defines the height of the vertex.
 * style - Optional string that defines the cell style.
 * 
 */
export default {
    name: 'ProcessFlow',
    data() {
      return {
        model: null,
        graph: null,
        tooltips: {}
      }
    },
    created (){
      this.tooltips["P001-02"] = "张三";
      this.tooltips["P002-02"] = "李四";
    },
    mounted () {
      if (!mxClient.isBrowserSupported()) {
          mxUtils.error('Browser is not supported!', 200, false);
      } else {
         this.initGraph();
         this.draw();
      }
    },
    methods: {

      initGraph: function(){
        this.graph = new mxGraph(this.$refs.graphContainer);
        this.graph.setEnabled(false); //不可移动或者拖动
        this.graph.setTooltips(true); //开启tooltip
        this.graph.getTooltipForCell = this.setToolTipHandler;
      },

      draw: function(){
        var parent = this.graph.getDefaultParent();

        this.setDefaultStyle();
        this.graph.getModel().beginUpdate();

        try {
          this.createSteps(parent);
          this.createProjectDiagramRow(parent);
          this.createCompanyDiagramRow(parent);
          this.createGroupDiagramRow(parent);

          this.createTimeLineColumn(parent);
          this.createTimeLineRow(parent);

          this.createText(parent);

        } finally {
            this.graph.getModel().endUpdate();
        }
      },

      //设置不同Cell的提示框
      setToolTipHandler: function(cell){

        if(this.tooltips[cell.id] !== undefined){
          return this.tooltips[cell.id]
        }
        return cell.value;

      },
      //设置默认样式
      setDefaultStyle: function(){

        //节点样式
        let defaultVertStyle = [];
        defaultVertStyle[mxConstants.STYLE_FILLCOLOR] = 'rgb(255, 255, 255)';
        defaultVertStyle[mxConstants.STYLE_STROKECOLOR] = 'rgb(0, 0, 0)';
        this.graph.getStylesheet().putDefaultVertexStyle(defaultVertStyle);

        //线相关样式
        let defaultEgyStype = [];
        defaultEgyStype[mxConstants.STYLE_STROKECOLOR] = 'rgb(0, 0, 0)';
        this.graph.getStylesheet().putDefaultEdgeStyle(defaultEgyStype);

      },

      /**
       * 创建流程节点
       */
      createSteps:function(oParent){

        this.graph.insertVertex(oParent, "S01", '采购发起', 120, 20, 120, 80, 'shape=step;whiteSpace=wrap;html=1;fixedSize=1;');
        this.graph.insertVertex(oParent, "S02", '采购审批', 360, 20, 120, 80, 'shape=step;whiteSpace=wrap;html=1;fixedSize=1;');
        this.graph.insertVertex(oParent, "S03", '采购结案', 600, 20, 120, 80, 'shape=step;whiteSpace=wrap;html=1;fixedSize=1;');
      },

      /**
       * 创建项目流程行
       */

      createProjectDiagramRow: function(oParent){
        this.graph.insertVertex(oParent, "P000", '项目', 40, 140, 40, 140, 'rounded=0;whiteSpace=wrap;html=1;horizontal=0;');

        this.graph.insertVertex(oParent, "P001-01", '1', 110, 145, 20, 20, 'shape=ellipse;whiteSpace=wrap;html=1;aspect=fixed;');
        this.graph.insertVertex(oParent, "P001-02", '采购部经理', 140, 140, 120, 30, 'whiteSpace=wrap;html=1;');

        this.graph.insertVertex(oParent, "P002-01", '2', 345, 145, 20, 20, 'shape=ellipse;whiteSpace=wrap;html=1;aspect=fixed;');
        this.graph.insertVertex(oParent, "P002-02", '项目经理', 380, 140, 115, 30, 'whiteSpace=wrap;html=1;');
      },

      /**
       * 创建公司流程行
       */

      createCompanyDiagramRow: function(oParent){
        this.graph.insertVertex(oParent, "C000", '公司', 40, 320, 40, 140, 'rounded=0;whiteSpace=wrap;html=1;horizontal=0;');

        this.graph.insertVertex(oParent, "P001-01", '3', 345, 335, 20, 20, 'shape=ellipse;whiteSpace=wrap;html=1;aspect=fixed;');
        this.graph.insertVertex(oParent, "P001-02", '采购部经理', 380, 330, 115, 30, 'whiteSpace=wrap;html=1;');

        this.graph.insertVertex(oParent, "P002-01", '3', 345, 385, 20, 20, 'shape=ellipse;whiteSpace=wrap;html=1;aspect=fixed;');
        this.graph.insertVertex(oParent, "P002-02", '财务部经理', 380, 380, 115, 30, 'whiteSpace=wrap;html=1;');

        this.graph.insertVertex(oParent, "P003-01", '3', 345, 435, 20, 20, 'shape=ellipse;whiteSpace=wrap;html=1;aspect=fixed;');
        this.graph.insertVertex(oParent, "P003-02", '运营部经理', 380, 430, 115, 30, 'whiteSpace=wrap;html=1;');


        this.graph.insertVertex(oParent, "P004-01", '5', 585, 345, 20, 20, 'shape=ellipse;whiteSpace=wrap;html=1;aspect=fixed;');
        this.graph.insertVertex(oParent, "P004-02", '运营部经理', 620, 340, 115, 30, 'whiteSpace=wrap;html=1;');
      },

      /**
       * 创建集团流程行
       */
      createGroupDiagramRow: function(oParent){
        this.graph.insertVertex(oParent, "G000", '集团', 40, 500, 40, 140, 'rounded=0;whiteSpace=wrap;html=1;horizontal=0;');

        this.graph.insertVertex(oParent, "G001-01", '4', 345, 515, 20, 20, 'shape=ellipse;whiteSpace=wrap;html=1;aspect=fixed;');
        this.graph.insertVertex(oParent, "G001-02", '采购部经理', 380, 510, 115, 30, 'whiteSpace=wrap;html=1;');
      },

      /**
       * 创建时间流程线 - 横向
       */
      createTimeLineRow: function(oParent){

          // 步骤行于项目图标行虚线箭头
          var separate_line1 = this.graph.insertEdge(oParent, "R001", null, null, null,'endArrow=classic;html=1;dashed=1;rounded=0;')
          separate_line1.geometry.sourcePoint = new mxPoint(120, 110);
          separate_line1.geometry.targetPoint = new mxPoint(760, 110);

          //项目图表行与公司图表行虚线箭头
          var separate_line2 = this.graph.insertEdge(oParent, "R002", null, null, null,'endArrow=classic;html=1;dashed=1;rounded=0;')
          separate_line2.geometry.sourcePoint = new mxPoint(120, 300);
          separate_line2.geometry.targetPoint = new mxPoint(760, 300);

          //公司图表行于集团图表行虚线箭头
          var separate_line3 = this.graph.insertEdge(oParent, "R003", null, null, null,'endArrow=classic;html=1;dashed=1;rounded=0;')
          separate_line3.geometry.sourcePoint = new mxPoint(120, 480);
          separate_line3.geometry.targetPoint = new mxPoint(760, 480);
      },

      /**
       * 创建时间流程项 - 纵向
       */
      createTimeLineColumn: function(oParent){
         //步骤间的间隔_GAP1
         var separate_gap1_lineA = this.graph.insertEdge(oParent, "C001_A", null, null, null,'endArrow=classic;html=1;dashed=1;rounded=0;')
         var separate_gap1_lineB = this.graph.insertEdge(oParent, "C001_B", null, null, null,'endArrow=classic;html=1;dashed=1;rounded=0;')
         separate_gap1_lineA.geometry.sourcePoint = new mxPoint(280, 20);
         separate_gap1_lineA.geometry.targetPoint = new mxPoint(280, 650);

         separate_gap1_lineB.geometry.sourcePoint = new mxPoint(320, 20);
         separate_gap1_lineB.geometry.targetPoint = new mxPoint(320, 650);

         //步骤间的间隔_GAP2
         var separate_gap2_lineA = this.graph.insertEdge(oParent, "C002_A", null, null, null,'endArrow=classic;html=1;dashed=1;rounded=0;')
         var separate_gap2_lineB = this.graph.insertEdge(oParent, "C002_B", null, null, null,'endArrow=classic;html=1;dashed=1;rounded=0;')
         separate_gap2_lineA.geometry.sourcePoint = new mxPoint(520, 20);
         separate_gap2_lineA.geometry.targetPoint = new mxPoint(520, 650);

         separate_gap2_lineB.geometry.sourcePoint = new mxPoint(560, 20);
         separate_gap2_lineB.geometry.targetPoint = new mxPoint(560, 650);
      },

      createText: function(oParent){
         //项目-流程-消耗天数
         this.graph.insertVertex(oParent, "T001", '1天', 285, 140, 30, 20, 'text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;fillColor=none;rounded=0;');
         this.graph.insertVertex(oParent, "T001", '3天', 525, 140, 30, 20, 'text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;fillColor=none;rounded=0;');

         //公司-流程-消耗天数
         this.graph.insertVertex(oParent, "T001", '2天', 525, 330, 30, 20, 'text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;fillColor=none;rounded=0;');

        //集团-流程-消耗天数
         this.graph.insertVertex(oParent, "T001", '1天', 525, 550, 30, 20, 'text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;fillColor=none;rounded=0;');
      }
    }
}


