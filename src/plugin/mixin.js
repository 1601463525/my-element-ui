import axios from './utils/request';
export default {
    methods: {
        // $get(url, params) {
        //     return axios.get(url, {
        //         params
        //     });
        // },
        // $post(url, params) {
        //     return axios.post(url, params);
        // },
        $ms(str) {
            this.$message.success(str);
        },
        $mc(content, onOk) {
            this.$confirm({
                title: '系统提示',
                content,
                onOk
            });
        }
    },
};