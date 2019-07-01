<template>
    <el-container class="index">
        <el-aside width="auto">
            <sidebar class="sidebar-container"/>
        </el-aside>

        <el-container>
            <el-header>
                <div class="inline-block">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item
                            :key="route.path"
                            :to="route.hasParent && { path: route.path }"
                            v-for="route in routes"
                        >{{ route.title }}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <span class="header-cell cp">
                    <el-dropdown
                        @command="
                            command => {
                                command();
                            }
                        "
                        trigger="click"
                    >
                        <span class="el-dropdown-link">
                            <div class="avatar-wrapper">
                                <img src="https://vom-img.nio.com/es8/2017/8/4/nio.png">
                            </div>
                            {{ username }}
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item
                                :command="
                                    () => {
                                        visible.updPass = true;
                                    }
                                "
                            >修改密码</el-dropdown-item>
                            <el-dropdown-item :command="logout">注销</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </span>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    name: "index",
    data() {},
    computed: {},
    methods: {}
};
</script>

<style lang="scss">
.index {
    height: 100%;
    .el-main {
        background-color: #f7f7f8;
    }

    .el-header,
    .el-footer {
        box-shadow: 0 0 5px 1px #b3c0d1;
        line-height: 60px;
    }
    .inline-block {
        display: inline-block;
    }

    .header-cell {
        padding: 0 12px;
        float: right;
        &:hover {
            background-color: #f5f5f5;
        }
        .avatar-wrapper {
            padding-top: 5px;
            float: left;
            margin-right: 10px;
            height: 50px;
            img {
                width: 50px;
                border-radius: 100px;
            }
        }
    }
}
</style>
