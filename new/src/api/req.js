const baseUrl = process.env.API_URL ? process.env.API_URL : '';

export default {
    // === 用户模块 ===== //
    LOGIN: `${baseUrl}/user/login`,
}
