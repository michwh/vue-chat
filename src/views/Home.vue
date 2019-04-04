<template>
  <div class="home">
    用户名：{{nickname}}<br>
    <input type="text" v-model="inputText">
    <button @click="sendMsg()" type="button">发送</button>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
export default {
  name: "home",
  components: {
    
  },
  data() {
    return {
      nickname: '',
      onlineTip: '',
      inputText: '',
    }
  },
  created() {
    this.nickname = prompt('请输入用户名：')
  },
  mounted() {
    // 监听通信事件
    socket.on("online", name => {
      if (!name) {
        return;
      }
      //this.onlineTip = `${name}加入群聊`;
      //this.showTip();
      console.log(`${name}加入群聊`)
    });

    socket.on("receiveMsg", data => {
      console.log(`${data.fromUser}：${data.content}`)
    });

    // 发送上线事件
    socket.emit("online", this.nickname);
  },
  methods: {
    sendMsg() {
      console.log(`${this.nickname}：${this.inputText}`)
      socket.emit('sendMsg', {
        fromUser: this.nickname,
        content: this.inputText
      })
    }
  }
};
</script>
