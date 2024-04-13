const maxHistory = 10;
const KEY = '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';
const KEYfree = 'sk-eekOpiVSLpsSUotGpkB6bOSe55RQ3pbN0gCEjIVgJdPdmHH9';
const url = 'https://api.openai.com/v1/chat/completions';
const freeUrl = 'https://api.chatanywhere.com.cn/v1/chat/completions';
const proxyUrl = 'https://api.openai-proxy.com/v1/chat/completions';

function addHistory(role, content, history) {
    if (history.length > maxHistory) {
        history.shift();
    }
    history.push({
        role,
        content
    });
}

function requestAi(history) {
    return new Promise((resolve, reject) => {
        const requestBody = {
            model: 'gpt-3.5-turbo', // 或者你想使用的其他模型
            messages: history,
            max_tokens: 100, // 生成的最大标记数量
            temperature: 0.7
        };

        wx.request({
            url: freeUrl,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${KEYfree}`
            },
            data: requestBody,
            success: function (res) {
                resolve(res.data.choices[0].message.content);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
}

module.exports = {
    addHistory: addHistory,
    requestAi: requestAi
};
