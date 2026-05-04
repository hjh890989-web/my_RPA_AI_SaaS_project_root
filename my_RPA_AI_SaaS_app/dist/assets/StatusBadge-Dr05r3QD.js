import{c as r,j as n}from"./index-CLHsvs3l.js";import{B as s}from"./badge-C1XYuzVF.js";/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=r("Video",[["path",{d:"m22 8-6 4 6 4V8Z",key:"50v9me"}],["rect",{width:"14",height:"12",x:"2",y:"6",rx:"2",ry:"2",key:"1rqjg6"}]]);function l({status:t}){const a=(e=>{switch(e.toUpperCase()){case"APPROVED":case"COMPLETED":return{variant:"success",label:e.toUpperCase()==="APPROVED"?"승인완료":"완료"};case"PENDING_REVIEW":case"PENDING":return{variant:"warning",label:e.toUpperCase()==="PENDING_REVIEW"?"검토대기":"검토중"};case"ANALYZING":case"STRUCTURING":return{variant:"info",label:e.toUpperCase()==="ANALYZING"?"분석중":"AI 분석중"};default:return{variant:"default",label:e}}})(t);return n.jsx(s,{variant:a.variant,children:a.label})}export{l as S,u as V};
