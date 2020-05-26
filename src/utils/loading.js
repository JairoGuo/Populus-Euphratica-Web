import {Loading} from "element-ui"

class Load{
  show(text=null){
    this.loading = Loading.service({
      fullscreen: true,
      background: "rgba(0, 0, 0, 0.7)",
      text: text?text:"正在加载中..."
    })
  }

  hide(){
    if(this.loading){
      this.loading.close()
    }
  }
}

export default new Load()
