import { Message } from 'element-ui';

function SafetyMessage(opt){
    opt.type = opt.type || 'info';
    if(typeof opt === 'object' ){
        if(opt.message === 'cancel' || opt.msg === 'cancel'){
            return false;
        }
        Message(opt);
    }
}

SafetyMessage.success = function(msg){
    Message.success(msg);
};
SafetyMessage.error = function(msg){
    if( msg !== 'cancel' ){
        Message.error(msg);
    }
};
SafetyMessage.info = function(msg){
    Message.info(msg);
};
SafetyMessage.warning = function(msg){
    Message.warning(msg);
};
export default SafetyMessage;
