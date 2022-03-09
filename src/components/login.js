import { postForm, wrapResponse } from '@/utils/ajax';

async function login(username,password,verCode, inputCode, remember) {
    if(!password || !username){
        throw new Error('请输入账号与密码');
    }
    if(!inputCode){
        throw new Error('请输入验证码');
    }
    if(verCode.toLowerCase() !== inputCode.toLowerCase()) {
        throw new Error('验证码不正确,请重新输入');
    }
    const url = '/api/authentication';
    const params = {
        username,
        password,
        from:'web',
        'remember-me': remember,
    };
    try {
       const result = await wrapResponse(postForm(url, params),'login');
       return result;
    }catch(e){
        throw new Error(e.message || '请重新登录');
    }
}

export default login;
