export function getRole(roleList, isAdmin){
    let result = '学员';
    for(const role of roleList){
        if(role === '企业管理员'){
            result = role;
            break;
        }
        if(role === '讲师'){
            result = role;
            break;
        }
    }
    return result;
}
