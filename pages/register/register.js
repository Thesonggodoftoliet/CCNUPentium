var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:null,
    phone:null,
    sex:null,
    qq:null
  },
  sex_radio({ detail = {} }) {
    this.setData({
      sex: detail.value
    });
  },
  commit: function(e){
    console.log(e);
    var name = e.detail.value.name;
    var sex = this.data.sex=='女'? 'female':'male'; 
    var qq = e.detail.value.qq;
    var phone = e.detail.value.phone;
    console.log(sex);
    app.wxRequest('POST','/auth/register/',{
      info: { name,qq,sex,phone }
    }, function(res){
      if (res.result_code == 1){
        var info = res.user_info;
        app.globalData.user_info  = info;
        if (info.role==0){
          wx.reLaunch({
            url: '/pages/user/user?page=me'
          })
        }
        else if (info.role==1){
          wx.reLaunch({
            url: '/pages/member/member?page=me'
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.user_info){
      var info = app.globalData.user_info;
      this.setData({
        name: info.name,
        sex: info.sex == 'female' ? '女' : '男',
        qq:info.qq,
        phone: info.phone
      })
       
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})