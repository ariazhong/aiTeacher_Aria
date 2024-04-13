Page({
    data: {
        grades: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '初一', '初二', '初三', '高一', '高二', '高三'],
        selectedGrade: null, // 初始没有选中的年级
        gradeSelected: false // 是否有年级被选中
    },
    selectGrade(e) {
        const selectedGrade = e.currentTarget.dataset.grade;
        this.setData({
            selectedGrade: selectedGrade,
            gradeSelected: true
        });
    },
    enterQuest() {
        if (this.data.gradeSelected) {
            wx.navigateTo({
                url: '/pages/dialogue/dialogue?grade=' + this.data.selectedGrade
            });
        } else {
            wx.showToast({
                title: '请选择年级',
                icon: 'none'
            });
        }
    }
});

  