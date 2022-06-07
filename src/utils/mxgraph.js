import * as mx from 'mxgraph'
const mxgraph = mx()
window.mxGraph = mxgraph.mxGraph
window.mxGraphModel = mxgraph.mxGraphModel
window.mxEditor = mxgraph.mxEditor
window.mxGeometry = mxgraph.mxGeometry
window.mxDefaultKeyHandler = mxgraph.mxDefaultKeyHandler
window.mxDefaultPopupMenu = mxgraph.mxDefaultPopupMenu
window.mxStylesheet = mxgraph.mxStylesheet
window.mxDefaultToolbar = mxgraph.mxDefaultToolbar
window.mxToolbar = mxgraph.mxToolbar
window.mxCell = mxgraph.mxCell
window.mxCodec = mxgraph.mxCodec
window.mxEvent = mxgraph.mxEvent
window.mxUtils = mxgraph.mxUtils
window.mxConstants = mxgraph.mxConstants
window.mxActor=mxgraph.mxActor
window.mxPoint=mxgraph.mxPoint
window.mxCellRenderer=mxgraph.mxCellRenderer

/**
 * 
 * 创建 step shape 并注册
 * ——————————————
 * \             \
 *  \             \  
 *  /             /
 * /_____________/
 * 
 */

function stepShape() {
    mxActor.call(this)
}

mxUtils.extend(stepShape, mxActor);
stepShape.prototype.size = .2;
stepShape.prototype.fixedSize = 20;
stepShape.prototype.isRoundable = function() {
    return !0
}
;
stepShape.prototype.redrawPath = function(c, h, q, l, p) {
    h = "0" != mxUtils.getValue(this.style, "fixedSize", "0") ? Math.max(0, Math.min(l, parseFloat(mxUtils.getValue(this.style, "size", this.fixedSize)))) : l * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, "size", this.size))));
    q = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
    this.addPoints(c, [new mxPoint(0,0), new mxPoint(l - h,0), new mxPoint(l,p / 2), new mxPoint(l - h,p), new mxPoint(0,p), new mxPoint(h,p / 2)], this.isRounded, q, !0);
    c.end()
};
mxCellRenderer.registerShape("step", stepShape);

export default mxgraph