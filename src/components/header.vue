<template>
    <header class="header">
        <div class="header-main">
            <div class="header-title">
                铁塔区块链管理平台
            </div>
            <div class="header-manage">
                <div>
                    <a-icon type="bell" :style="{ fontSize: '16px'}"></a-icon>
                    <span>消息提醒</span>
                </div>
                <div>
                    <a-icon type="user" :style="{ fontSize: '16px'}"></a-icon>
                    <span>{{ name }}</span>
                </div>
                <div>
                    <a-icon type="unlock" :style="{ fontSize: '16px'}"></a-icon>
                    <span>修改密码</span>
                </div>
                <div @click="onLogoutClick">
                    <a-icon type="logout" :style="{ fontSize: '16px'}"></a-icon>
                    <span>退出</span>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import { getJSON, wrapResponse } from '@/utils/ajax';
import { MessageBox } from 'element-ui';
export default {
    props: {
        mode: {
            type: String,
            default: 'view',
        },
        name: {
            type: String,
            default: () => '',
        },
        role: {
            type: String,
            default: () => '',
        },
        roleList: {
            type: Array,
            default: () => [],
        },
        phone: {
            type: String,
            default: () => '',
        },
        avatar: {
            type: String,
            default: () => '',
        },
        isAdmin: {
            type: String,
            default: () => ''
        }
    },
    data() {
        return {
            userInfoShow: false,
        };
    },
    computed: {
        arrowCls() {
            return {
                arrow: true,
                'safety-icon-downarrow-fill': true,
            };
        },
        userPanelCls() {
            return {
                'user-panel': true,
                'user-panel-show': this.userInfoShow,
            };
        },
        userInfoCls() {
            return {
                'user-info': true,
                'user-info-selected': this.userInfoShow,
            };
        },
    },
    mounted() {
        window.onclick = () => {
            this.userInfoShow = false;
        };
    },
    methods: {
        onUserInfoClick(e) {
            this.userInfoShow = !this.userInfoShow;
            e.stopPropagation();
        },
        onDetailClick(e) {
            e.stopPropagation();
        },
        async onLogoutClick() {
            await MessageBox.confirm('确定退出当前账号？', '退出登录', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                sessionStorage.setItem('isAuth',false);
                window.location.href = `${window.location.origin}/blockchain/`;
            });
           
        },
        onSettingClick() {
            
        },
    },
};
</script>

<style lang="scss" scoped>
.header {
    position: relative;
    z-index: 99;
    background-color: #fff;
    height: 56px;
    box-shadow: 0px 1px 4px 0px rgba(159, 168, 176, 0.25);
    background: #4c85ff;
    .header-main {
        display: flex;
        justify-content: space-between;
        height: 56px;
        line-height: 56px;
        color: #ffffff;
        .header-title {
            font-size: 22px;
            color: #ffffff;
            margin-left: 50px;
        }
        .header-manage {
            display: flex;
            justify-content: space-between;
            cursor: pointer;
            div {
                width: auto;
                display: flex;
                justify-content: center;
                align-items: center;
                min-width: 100px;
                span {
                    margin-left: 5px;
                }
            }
        }
    }
    .tools-container {
        position: absolute;
        top: 0;
        right: 0;
        margin-right: 20px;
        & > li {
            display: inline-block;
            height: 56px;
            line-height: 56px;
            vertical-align: top;
            a {
                display: inline-block;
                width: 100%;
                height: 100%;
                text-decoration: none;
            }
            cursor: pointer;
            &:hover {
                background-color: #eee;
            }
            .tool-icon {
                font-size: 18px;
                color: #999999;
                padding: 0 10px;
                &:hover {
                    color: #4c85ff;
                }
            }
        }
    }

    .qrcode {
        &:hover {
            .qrcode-content {
                display: block;
            }
        }
        .qrcode-content {
            position: absolute;
            top: 45px;
            z-index: 100;
            width: 140px;
            height: 180px;
            background-color: #fff;
            box-shadow: 0 4px 16px #ccc;
            border-radius: 2px;
            display: none;
            .qrcode-safe {
                width: 124px;
                height: 124px;
                margin: 8px;
                background: url(/public/dist/global/components/images/51safe.png)
                    center no-repeat;
                background-size: cover;
            }
            .content-wrap {
                font-size: 12px;
                text-align: center;
                span {
                    display: block;
                    height: 18px;
                    line-height: 14px;
                }
                .scan {
                    color: #333;
                }
                .download-app {
                    color: #999;
                }
            }
        }
    }

    .user-info {
        display: block;
        position: relative;
        padding: 0 12px;
        cursor: pointer;
        font-size: 16px;
        color: #fff;
        height: 56px;
        user-select: none;

        .avatar {
            width: 32px;
            height: 32px;
            margin-top: -4px;
            border-radius: 50%;
            vertical-align: middle;
        }
        .arrow {
            color: #999999;
            font-size: 20px;
            display: inline-block;
            transform: scale(0.4);
            margin-left: 2px;
            transition: transform 0.3s;
        }

        &-selected {
            background-color: #eee;
            .arrow {
                transform: scale(0.4) rotate(180deg);
            }
        }
    }
    .user-panel {
        display: none;
        right: 0;
        top: 56px;
        box-sizing: content-box;
        position: absolute;
        background: #fff;
        border: 1px solid #eee;
        border-top: 1px solid transparent;
        background-clip: padding-box;
        box-shadow: 0 3px 12px rgba(0, 0, 0, 0.176);
        width: 160px;
        color: #2b3643;
        font-size: 14px;
        line-height: 14px;
        z-index: 9999;
        &-show {
            display: block;
        }
        .user-detail {
            padding: 15px 0 10px;
            border-bottom: 1px solid #e0e0e0;
            padding-left: 15px;
            font-weight: 400;
            cursor: default;
            .user-name {
                height: 16px;
                .name {
                    font-size: 14px;
                    line-height: 16px;
                    color: #2b3643;
                    float: left;
                    cursor: default;
                }
                .role {
                    font-size: 12px;
                    line-height: 16px;
                    padding: 0 5px;
                    background-color: #4c85ff;
                    color: #fff;
                    float: right;
                    position: relative;
                    cursor: default;
                    &:after {
                        position: absolute;
                        content: '';
                        left: -8px;
                        top: 0;
                        border-top: 8px solid transparent;
                        border-bottom: 8px solid transparent;
                        border-right: 8px solid #4c85ff;
                    }
                }
            }
            .user-phone {
                color: #808080;
                font-size: 12px;
                margin-top: 10px;
                cursor: default;
            }
        }
        .user-tools {
            display: flex;
            flex-direction: column;
            > li {
                line-height: 36px;
                color: #2b3643;
                cursor: default;
                padding-left: 15px;
                a {
                    text-decoration: none;
                    color: #2b3643;
                }
                &:hover {
                    background-color: #ecf2ff;
                    color: #4c85ff;
                    .manage-icon {
                        color: #4c85ff;
                    }
                }
                .manage-icon {
                    color: #2b3643;
                    line-height: 36px;
                    margin-right: 5px;
                    font-weight: 400;
                }
            }
        }
    }
}
</style>

