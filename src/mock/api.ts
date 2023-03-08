// get请求从config.url获取参数，post从config.body中获取参数
function paramObj(url: any) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
        '"}'
    )
}

const api = [
    // 登录接口
    {
        url: '/login',
        type: 'post',
        response: (config: any) => {
            // const {account} = paramObj(config.url)
            const {account} = JSON.parse(config.body)
            if (account === 'admin') {
                return {
                    code: 200,
                    message: '操作成功',
                    data: {
                        token: 'admin'
                    }
                }
            }
            return {
                code: 401,
                message: '用户信息错误，请重试~',
                data: {}
            }
        }
    }
]
export default api