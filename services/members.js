const {menuData }= require('../repositories/members')

let parentsArr = [];
let hierarchyCache = new Map();


  const getHierarchy = (memberId) => {
    if (hierarchyCache.has(memberId)) return hierarchyCache.get(memberId);
    const member = menuData.find(m => m.memberId === memberId);
    if (!member) return null;
  
    const hierarchy = [member];
  
    if (member.level === 1) {
    hierarchyCache.set(memberId, hierarchy);
      return hierarchy;
    }
  
    const parentHierarchy = getHierarchy(member.parentMemberId);
    const fullHierarchy = hierarchy.concat(parentHierarchy);

    hierarchyCache.set(memberId, fullHierarchy);
    return fullHierarchy;
  };



  
const getHirarchyByMember=(memberId)=>{
    const member = menuData.find(m => m.memberId === memberId)
    if (!member) return null;
    if(parentsArr[memberId]!= null)
        return parentsArr[memberId]
    parentsArr[memberId]= []
    buildHirarchy(memberId)

}



const getAllMembers = ()=>{
    return menuData
}




module.exports ={ getAllMembers, getHierarchy}