// 所有支付方法
import api from "@/units/server/api.js";
import play from "@/units/js/play.js";
export default {
    /**
     * 这里写项目中的使用的支付方法 从上方中拿出自己项目所需支付即可
     * 因为一般的业务场景下支付一定是会被多次在多个地方调用的，
     * 且一般都是将单号传递给后台，后台会给我们支付所需信息，然后获取完信息后再进行拉起支付。
     * 以下为示例
        // 微信公众号支付
        wxH5Play(order_id, success, fail) {
            // 将订单传递给后台
            api.hwcPay({order_id}, {
                success: res=>{
                    // 拿到支付信息并传递给play中微信的支付方法中
                    play.wxAccountsPay(res.json, success, fail);
                }
            })
        }
	**/
}