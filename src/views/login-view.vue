<template>
    <div style="margin: 20px" />
    <el-form
      ref="loginFormRef"
      label-width="100px"
      :rules="loginrules"
      :model="loginform"
      style="max-width: 460px"
    >
      <el-form-item label="useName" prop="name">
        <el-input v-model="loginform.name" clearable/>
      </el-form-item>
      
      <el-form-item label="passwd" prop="pass">
        <el-input type="password" v-model="loginform.passwd" clearable  /> 
      </el-form-item>

      <el-form-item>
      <el-button type="primary" @click="submitForm(loginFormRef)">
        login
      </el-button>
    </el-form-item>

    </el-form>
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { ElMessage, FormInstance, FormRules } from 'element-plus'
  import Mock from 'mockjs';
  import { useRouter } from "vue-router"
  import axios from '../http'
  import { id } from 'element-plus/es/locale';

  const loginFormRef = ref<FormInstance>()
  const router = useRouter();

  const loginform = reactive({
    name: '',
    passwd: ''
  })

  const checkusr = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please input the usrname'))
  }
  callback()
}

  const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  }
  callback()
}

  //校验规则
  const loginrules = reactive<FormRules>({
  name: [{ validator: checkusr, trigger: 'blur' }],
  passwd: [{ validator: validatePass, trigger: 'blur' }],
})


// const validatePass2 = (rule: any, value: any, callback: any) => {
//   if (value === '') {
//     callback(new Error('Please input the password again'))
//   } else if (value !== ruleForm.pass) {
//     callback(new Error("Two inputs don't match!"))
//   } else {
//     callback()
//   }
// }

  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }

  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return

    formEl.validate((valid, fields) => {
      if (valid) {
        axios
        .get(
          '/usr.json',{
            headers: {
              "Content-Type": "application/octet-stream",
              "Access-Control-Allow-Origin": "*",
              }
            }
        )
        .then(res => {
          const usr = res.data.login[0].name;
          const passwd = res.data.login[0].passwd;
          const input_name = loginform.name;
          const input_psw = loginform.passwd;
          if(usr !== input_name || passwd !== input_psw)
          {
              ElMessage({
                type: 'error',
                message: '账号不匹配'
              })
              formEl.resetFields();
          }
          else{
              ElMessage({
                type: 'success',
                message: '登陆成功'
              })
              router.push("/");
          }
        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  </script>
  